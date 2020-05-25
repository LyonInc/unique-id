import UniqueIdGenerator from '../src';

describe('UniqueIdGenerator', () => {
  it('generates the correct sequence', () => {
    const generator = new UniqueIdGenerator();
    expect(generator.next(1)).toBe('tWJbwb');
    expect(generator.next(2)).toBe('eDUHNb');
    expect(generator.next(3)).toBe('0k3W4b');
    expect(generator.next(4)).toBe('w9dtmc');
    expect(generator.next(5)).toBe('wWoCi');
    expect(generator.next(6)).toBe('2hVQz');
    expect(generator.next(7)).toBe('PyOoR');
    expect(generator.next(8)).toBe('cjzW8');
    expect(generator.next(9)).toBe('bIGoqb');
    expect(generator.next(10)).toBe('A5tDHb');
  });
});
