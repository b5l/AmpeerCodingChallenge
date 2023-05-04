const assert = require('assert');

// Not specified whether the function should have side effects, so this solution will
// modify the original object!
function transform(obj) {
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value !== 'object') {
            obj[key] = transformValue(value);
            continue;
        }

        obj[key] = transform(obj[key]);
    }

    return obj;
}

function transformValue(value) {
    if (typeof value === 'string') return `${value} AE`;
    if (typeof value === 'number') return value + 1;
    return value;
}

const result = transform({
    a: 123,
    b: 'abc',
    c: [1, 2, 3],
    d: {
        e: [4, 5, 6]
    }
});

assert.deepEqual(result, {
    a: 124,
    b: 'abc AE',
    c: [2, 3, 4],
    d: {
        e: [5, 6, 7]
    }
});
