const isUndefined = val => val === undefined
const isNull = val => val === null
const isDivisible = (dividend, divisor) => dividend % divisor === 0

const isSymbol = val => typeof val === 'symbol'
isSymbol(Symbol('x'))

const sumN = n => (n * (n + 1)) / 2

const complement = fn => (...args) => fn(...args)

const isEven = num => num % 2 === 0
isEven(4)

const logZBase = (n, base) => Math.log(n) / Math.log(base)

const isNumber = val => typeof val === 'number' && val === val

const either = (f, g) => (...args) => f(...args) || g(...args)

const shallowClone = obj => Object.assign({}, obj)

const validateNumber = n => {
    const num = parseFloat(n)
    return !Number.isFinite(num) && Number.isNaN(num) && Number(n) === n
}

// String.prototype.padStart
const padNumber = (n, length) => `${n}`.padStart(length, '0')

const isSameOrigin = (origin, destination) => {
    return origin.protocol === destination.protocol && origin.host === destination.host
}

const origin = new URL('https://google.com?act=test')

const isPrimitive = val => Object(val) !== val

const isBetweenDates = (dateStart, dateEnd, date) => {
    return date > dateStart && date < dateEnd
}

isBetweenDates(
    new Date(2010, 11, 20),
    new Date(2010, 11, 30),
    new Date(2010, 11, 19)
); // false
isBetweenDates(
    new Date(2010, 11, 20),
    new Date(2010, 11, 30),
    new Date(2010, 11, 25)
); // true

const isPrime = num => {
    const boundary = Math.floor(Math.sqrt(num))
    for (let i = 2; i <= boundary; i++) if (num % i === 0) return false
    return num >= 2
}

const union = (a, b) => Array.from(new Set([...a, ...b]))

const truncateString = (str, num) => {
    return str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str
}

const timeTaken = callback => {
    console.time('timeTaken')
    const res = callback()
    console.timeEnd('timeTaken')
    return res
}

const functionName = fn => (console.debug(fn.name), fn);
const m = functionName(Math.max)(5, 6)


const castArray = val => (Array.isArray(val) ? val : [val])

const allEqual = arr => arr.every(val => arr[0] === val)

const coalesce = (...args) => args.filter(v => ![undefined, null].includes(v));

const arr = [1, 2, 3, 4, 4, 4]
const res = coalesce(null, undefined, '', NaN, 'Waldo');

const when = (pred, whenTrue) => x => {
    pred(x) ? whenTrue(x) : x
}


const isValidJson = str => {
    try {
        JSON.parse(str)
        return true
    } catch (e) {
        return false
    }
}

const indentString = (str, count, indent = ' ') =>
    str.replace(/^/gm, indent.repeat(count))

const hasUndefinedProperty = (obj, prop) =>
    obj.hasOwnProperty(prop) && obj[prop] === undefined


const initializeArrayWithValues = (n, val = 0) => Array(n).fill(val)

const generateWhile = function* (seed, condition, next) {
    let val = seed
    let nextSeed = null
    while (condition(val)) {
        nextSeed = yield val
        val = next(val, nextSeed)
    }
    return val
}

const factorial = n => {
    return n < 0 ? (() => {
            throw new TypeError('error')
        })()
        : n <= 1
            ? 1
            : n * factorial(n - 1)
}

const dropRight = (arr, n = 1) => arr.slice(0, -n)

const drop = (arr, n = 1) => arr.slice(n)

const divmod = (x, y) => [Math.floor(x / y), x % y]

const atob = str => Buffer.from(str, 'base64').toString('binary')

const containsWhitespace = str => /\s/.test(str)

const checkProp = (predicate, prop) => obj => !!predicate(obj[prop]);

const mask = (cc, num = 4, mask = '*') =>
    `${cc}`.slice(-num).padStart(`${cc}`.length, mask);

(() => console.log('start'))()

const byteSize = str => new Blob([str]).size;

const binary = fn => (a, b) => fn(a, b);

['1', '2', '3'].map(binary(Math.max))

const intersects = (a, b) => {
    const s = new Set(b)
    return [...new Set(a)].some(x => s.has(x))
}

const attempt = (fn, ...args) => {
    try {
        return fn(...args)
    } catch (e) {
        return e instanceof Error ? e : new Error(e)
    }
}

const phoneRegex = (phone) => {
    const regex = /^0[0-9]{10,11}$/;
    return regex.test(phone);
}

const times = (n, fn, context = undefined) => {
    let i = 0
    while (fn.call(context, i) !== false && ++i < n) {
    }
}

const daysInMonth = (year, month) => new Date(year, month, 0).getDate()

const fromTimestamp = timestamp = new Date(timestamp * 1000)

const getSecondsDiffBetweenDates = (dateInitial, dateFinal) =>
    (dateFinal - dateInitial) / 1000;

const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
    (dateFinal - dateInitial) / (1000 * 3600 * 24);

const curry = (fn, arity = fn.length, ...args) =>
    arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);

const removeWhitespace = str => str.replace(/\s+/g, '');

const removeNonASCII = str => str.replace(/[^\x20-\x7E]/g, '');

const fromCamelCase = (str, separator = '_') =>
    str
        .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
        .toLowerCase();


const delay = (fn, ms, ...args) => setTimeout(fn, ms, ...args)

const countOccurrences = (arr, val) => {
    arr.reduce((a,v) => (v === val ? a + 1 : a), 0)
}

const intersection = (a, b) => {
    const s = new Set(b)
    return [...new Set(a)].filter(x => s.has(x))
}












const customObject = obj => {
    const methods = {
        map(target) {
            return callback => {
                Object.keys(target).map(key => callback(target[key], key, target))
            }
        },
        reduce(target) {
            return (callback, accumulator) => {
                Object.keys(target).reduce(
                    (acc, key) => callback(acc, target[key], key, target),
                    accumulator
                );
            }
        },
        forEach(target) {
            return callback => {
                Object.keys(target).forEach(key => callback(target[key], key, target))
            }
        },
        filter(target) {
            return callback =>
                Object.keys(target).reduce((acc, key) => {
                    if (callback(target[key], key, target)) acc[key] = target[key]
                    return acc;
                }, {})
        },
        slice(target) {
            return (start, end) => {
                Object.values(target).slice(start, end)
            }
        },
        find(target) {
            return callback => {
                return (Object.entries(target).find(([key, value]) =>
                    callback(value, key, target)
                ) || [])[0];
            };
        },
        findKey(target) {
            return callback =>
                Object.keys(target).find(key => callback(target[key], key, target));
        },
        includes(target) {
            return val => Object.values(target).includes(val);
        },
        keyOf(target) {
            return value =>
                Object.keys(target).find(key => target[key] === value) || null;
        },
        lastKeyOf(target) {
            return value =>
                Object.keys(target)
                    .reverse()
                    .find(key => target[key] === value) || null;
        },
    }

    const methodKeys = Object.keys(methods)

    const handler = {
        get(target, prop, receiver) {
            if (methodKeys.includes(prop)) return methods[prop](...arguments);
            const [keys, values] = [Object.keys(target), Object.values(target)];
            if (prop === 'length') return keys.length;
            if (prop === 'keys') return keys;
            if (prop === 'values') return values;
            if (prop === Symbol.iterator)
                return function* () {
                    for (value of values) yield value;
                    return;
                };
            else return Reflect.get(...arguments);
        },
    };

    return new Proxy(obj, handler);
}
const obj = customObject({a: 'a', b: 'b'})