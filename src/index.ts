import createPseudoEncrypt, { secretSauce } from './pseudo-encrypt';

const DEFAULT_ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default class UniqueIdGenerator {
  private alphabet: string;

  private base: number;

  private encrypt: (value: number) => number;

  constructor(alphabet: string = DEFAULT_ALPHABET, sauce = secretSauce) {
    this.alphabet = alphabet;
    this.base = alphabet.length;
    this.encrypt = createPseudoEncrypt(sauce);
  }

  next(index: number): string {
    let output = '';
    let n = Math.abs(this.encrypt(index)) | 0;

    while (n > 0) {
      output += this.alphabet[(n % this.base)];
      n = (n / this.base) | 0;
    }

    return output;
  }
}
