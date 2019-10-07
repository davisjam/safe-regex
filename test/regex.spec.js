const safeRegex = require('../');

const REPETITION_LIMIT = 25;
const REPETITION_TOO_MUCH = REPETITION_LIMIT + 1;

test('safe regex', () => {
    const good = [
        // regular RE's
        /\bOakland\b/,
        /\b(Oakland|San Francisco)\b/i,
        /^\d+1337\d+$/i,
        /^\d+(1337|404)\d+$/i,
        /^\d+(1337|404)*\d+$/i,
        /(a+)|(b+)/,
        RegExp('a?'.repeat(REPETITION_LIMIT) + 'a'.repeat(REPETITION_LIMIT)),
        
        // RE's in a string
        '/^\d+(1337|404)*\d+$/',
        '^@types/query-string',
        
        // normal string
        'aaa',
        
        // non-RE, non-string
        1
    ];

    good.forEach(re => {
        expect(safeRegex(re)).toBe(true);
    });
});

test('safe regex with custom repetition limit', () => {
    const LOW_REPETITION_LIMIT = 3;
    const re = RegExp(Array(LOW_REPETITION_LIMIT).join('a?'));

    expect(safeRegex(re, {limit: LOW_REPETITION_LIMIT})).toBe(true);
});

test('unsafe regex', () => {
    const bad = [
        // regular RE's
        /^(a?){25}(a){25}$/,
        RegExp('a?'.repeat(REPETITION_TOO_MUCH) + 'a'.repeat(REPETITION_TOO_MUCH)),
        /(x+x+)+y/,
        /foo|(x+x+)+y/,
        /(a+){10}y/,
        /(a+){2}y/,
        /(.*){1,32000}[bc]/,
        
        // Star height with branching and nesting.
        /(a*|b)+$/,
        /(a|b*)+$/,
        /(((b*)))+$/,
        /(((b*))+)$/,
        
        // RE's in a string
        '(a+)+'
    ];

    bad.forEach(re => {
        expect(safeRegex(re)).toBe(false);
    });
});

test('unsafe regex with custom repetition limit', () => {
    const LOW_REPETITION_LIMIT = 3;
    const re = RegExp('a?'.repeat(LOW_REPETITION_LIMIT + 1));

    expect(safeRegex(re, {limit: LOW_REPETITION_LIMIT})).toBe(false);
});

test('invalid regex', () => {
    const invalid = [
        '*Oakland*',
        'hey(yoo))',
        'abcde(?>hellow)',
        '[abc'
    ];

    invalid.forEach(re => {
        expect(safeRegex(re)).toBe(false);
    });
});
