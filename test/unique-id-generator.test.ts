import UniqueIdGenerator from '../src';
import createPseudoEncrypt from '../src/pseudo-encrypt';

describe('UniqueIdGenerator', () => {
  it('generates the correct sequence', () => {
    const pseudoEncrypt = createPseudoEncrypt();
    const generator = new UniqueIdGenerator('0123456789');

    function reverse(str: string) {
      return str.split('').reverse().join('');
    }

    for (let i = 0; i < 100; i += 1) {
      expect(generator.next(i)).toBe(reverse(pseudoEncrypt(i).toString()));
    }
  });
});
