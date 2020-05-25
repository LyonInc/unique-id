import createPseudoEncrypt from '../src/pseudo-encrypt';

describe('pseudo-encrypt', () => {
  it('generates the correct sequence', () => {
    const pseudoEncrypt = createPseudoEncrypt();
    expect(pseudoEncrypt(-10)).toBe(-1270576520);
    expect(pseudoEncrypt(-9)).toBe(-236348969);
    expect(pseudoEncrypt(-8)).toBe(-1184061109);
    expect(pseudoEncrypt(-7)).toBe(-25446276);
    expect(pseudoEncrypt(-6)).toBe(-1507538963);
    expect(pseudoEncrypt(-5)).toBe(-518858927);
    expect(pseudoEncrypt(-4)).toBe(-1458116927);
    expect(pseudoEncrypt(-3)).toBe(-532482573);
    expect(pseudoEncrypt(-2)).toBe(-157973154);
    expect(pseudoEncrypt(-1)).toBe(-1105881908);
    expect(pseudoEncrypt(0)).toBe(1777613459);
    expect(pseudoEncrypt(1)).toBe(561465857);
    expect(pseudoEncrypt(2)).toBe(436885871);
    expect(pseudoEncrypt(3)).toBe(576481439);
    expect(pseudoEncrypt(4)).toBe(483424269);
    expect(pseudoEncrypt(5)).toBe(1905133426);
    expect(pseudoEncrypt(6)).toBe(971249312);
    expect(pseudoEncrypt(7)).toBe(1926833684);
    expect(pseudoEncrypt(8)).toBe(735327624);
    expect(pseudoEncrypt(9)).toBe(1731020007);
    expect(pseudoEncrypt(10)).toBe(792482838);
  });
});
