/**
 * Based on http://wiki.postgresql.org/wiki/Pseudo_encrypt
 *
 * pseudo_encrypt(int) can be used as a pseudo-random generator
 * of unique values. It produces an integer output that is uniquely
 * associated to its integer input (by a mathematical permutation),
 * but looks random at the same time, with zero collision. This is useful
 * to communicate numbers generated sequentially without revealing their
 * ordinal position in the sequence (for ticket numbers, URLs shorteners, promo codes...)
 *
 * The permutation property is a consequence of the function being a Feistel network;
 * see http://en.wikipedia.org/wiki/Feistel_cipher
 *
 * It performs a very simple encryption, without a key (in a way,
 * the key is hardcoded in the algorithm).
 *
 * - To encrypt 32-bit values with a key, see Skip32 (still in plpgsql).
 * - To encrypt 64-bit values with a key, see XTEA
 * - To constrain the outputs to smaller, arbitrary ranges, such a numbers with
 * N decimal digits, see Pseudo_encrypt_constrained_to_an_arbitrary_range
 *
 * The first iteration of this code was posted in
 * http://archives.postgresql.org/pgsql-general/2009-05/msg00082.php by Daniel Vérité;
 * below is an improved version, following comments by Jaka Jancar.
 *
 * Notes:
 * - it returns a signed integer (postgres doesn't have unsigned integers anyway).
 * - it's a self-inverse, that is: pseudo_encrypt(pseudo_encrypt(X)) = X
 * - the output may be customized by changing this function of r1:
 * ((1366 * r1 + 150889) % 714025) / 714025.0) (inspired from random generators) with
 * your own "secret sauce". The replacement must be a function in the mathematical sense
 * (that is, if x=y then f(x)=f(y) ) and produce a value between 0 and 1.
 * @param value
 */
export function secretSauce(r1: number): number {
  return ((1366.0 * r1 + 150889) % 714025) / 714025.0;
}

export default function createPseudoEncrypt(sauce = secretSauce): (value: number) => number {
  return function pseudoEncrypt(value: number): number {
    /**
     * Make sure that the value is an int number
     */
    const baseValue = value | 0;

    /**
     * split value into two parts
     */
    let l1 = (baseValue >> 0x10) & 0xFFFF;
    let r1 = baseValue & 0xFFFF;

    /**
     * Begin cycle
     */
    for (let i = 0; i < 3; i += 1) {
      const l2 = r1;
      const r2 = l1 ^ (Math.round(sauce(r1) * 32767) | 0);
      l1 = l2;
      r1 = r2;
    }

    return (r1 << 16) + l1;
  };
}
