import { KMP } from '../src/processing/KMP';

describe('KMP', () => {
    it('should return the correct index of the first occurrence of pattern in text', () => {
        expect(KMP('abcxabcdabcdabcy', 'abcdabcy')).toBe(8);
        expect(KMP('abcxabcdabcdabcy', 'abcdabca')).toBe(-1);
        expect(KMP('aaaaa', 'aa')).toBe(0);
        expect(KMP('aaaaa', 'aaa')).toBe(0);
        expect(KMP('aaaaa', 'aaaa')).toBe(0);
        expect(KMP('aaaaa', 'aaaaa')).toBe(0);
        expect(KMP('abababab', 'ababababab')).toBe(-1);
        expect(KMP('abababab', '')).toBe(0);
    });
});