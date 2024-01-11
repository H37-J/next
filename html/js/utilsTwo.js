const insertAt = (arr, i, ...vals) => {
    arr.splice(i + 1, 0, ...vals)
    return arr
}

const aperture = (n, arr) => {
    return n > arr.length ? [] : arr.slice(n - 1).map((v, i) => arr.slice(i, i + n))
}

const strIncludes = (str, text) => {
    return str.includes(text)
}

const strIndexOf = (str, text) => {
    return str.indexOf(text)
}

const resolvAfter = (value, delay) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(value, delay))
    })
}

//rest
const rest = (...args) => {
}

rest(1, 2, 3, 4)

// Spread
// const obj = {name: 'hjk', age: 1}
// const str = 'test'
// const temp = {...obj, age: 2}

const nthArg = n => (...args) => args.slice(n)[0]

const keyMatch = (obj, source) => {
    return Object.keys(source).every(
        key => obj.hasOwnProperty(key) && obj[key] === source[key]
    )
}

const generateItems = (n, fn) => Array.from({length: n}, (_, i) => fn(i))

const dropWhile = (arr, func) => {
    while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1)
    return arr
}

const dayName = (date, locale) => {
    return date.toLocaleDateString(locale, {weekday: 'long'})
}

const yesterday = () => {
    const d = new Date()
    d.setDate(d.getDate() - 1)
    return d.toISOString().split('T')[0]
}

const closest = (arr, n) => {
    return arr.reduce((acc, num) => (Math.abs(num - n) < Math.abs(acc - n) ? num : acc))
}

function log(text) {
    console.log(this.name, text)
}

// const obj = {name: 'hjk'}
// log.apply(obj, ['test'])
// log.call(obj, 'test')

const haveSameContents = (a, b) => {
    for (const v of new Set([...a, ...b]))
        if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
            return false
    return true
}

const randomAlphaNumeric = length => {
    let s = ''
    Array.from({length}).some(() => {
        s += Math.random().toString(36).slice(2)
        return s.length >= length
    })
    return s.slice(0, length)
}

const hasValue = (obj, value) => {
    Object.values(obj).includes(value)
}

const arr = [1, 2, 3, 4]

const longestItem = (...values) => {
    return values.reduce((acc, value) => acc.length > value.length ? acc : value)
}

const isArrayLike = obj => {
    return obj != null && typeof obj[Symbol.iterator] === 'function'
}

const over = (...fns) => (...args) => fns.map(fn => fn.apply(null, args))

const initializeArrayWithRangeRight = (end, start = 0, step = 1) =>
    Array.from({length: Math.ceil((end + 1 - start) / step)}).map(
        (v, i, arr) => (arr.length - i - 1) * step + start
    );

const indexOfAll = (arr, val) => {
    return arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), [])
}

const randomIntArrayInRange = (min, max, n = 1) =>
    Array.from({length: n},
        () => Math.floor(Math.random() * (max - min + 1)) + 1)

const primeFactor = (num) => {
    let arr = []
    let n = 2
    while (num > 1) {
        if (num % n === 0) {
            arr.push(n)
            num /= n
        } else {
            n++
        }
    }
    return arr
}

const reduceWhich = (arr, comparator = (a, b) => a - b) => {
    return arr.reduce((a, b) => comparator(a, b) >= 0 ? b : a)
}

const intersectionWith = (a, b, comp) => {
    return a.filter(x => b.findIndex(y => comp(x, y)) !== -1)
}

const fibonacci = n => {
    return Array.from({length: n}).reduce(
        (acc, val, i) => acc.concat(i > 1 ? [acc[i - 1] + acc[i - 2]] : i),
        []
    )
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function sleepyWork() {
    await sleep(1000)
}

const bindKey = (context, fn, ...boundArgs) => (...args) => context[fn].apply(context, [...boundArgs, ...args])

const pluck = (arr, key) => arr.map(i => i[key])

const mergeSortedArrays = (a, b) => {
    const _a = [...a],
        _b = [...b];
    return Array.from({length: _a.length + _b.length}, () => {
        if (!_a.length) return _b.shift();
        else if (!_b.length) return _a.shift();
        else return _a[0] > _b[0] ? _b.shift() : _a.shift();
    });
};

const memoize = fn => {
    const cache = new Map();
    const cached = function (val) {
        return cache.has(val)
            ? cache.get(val)
            : cache.set(val, fn.call(this, val)) && cache.get(val);
    };
    cached.cache = cache;
    return cached;
};

const initializeArrayWithRange = (end, start = 0, step = 1) =>
    Array.from(
        {length: Math.ceil((end - start + 1) / step)},
        (_, i) => i * step + start
    );

const xProd = (a, b) => a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), [])

const mapToObject = map => Object.fromEntries(map.entries());
// mapToObject(new Map([['a', 1], ['b', 2]])); // {a: 1, b: 2}

const capitalize = ([first, ...rest], lowerRest = false) =>
    first.toUpperCase() +
    (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

const call = (key, ...args) => context => {
    return context[key](...args)
}

// Promise.resolve([1, 2, 3])
//     .then(call('map', x => 2 * x))
//     .then(console.log)

const alphabetical = (arr, getter, order = 'asc') =>
    arr.sort(
        order === 'desc' ? (a, b) => getter(b).localeCompare(getter(a))
            : (a, b) => getter(a).localeCompare(getter(b))
    )

const flatIterator = function* (itr) {
    for (let item of itr) {
        if (item[Symbol.iterator]) yield* flatIterator(item);
        else yield item;
    }
};

const deepFlatten = arr =>
    [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)))
// deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

const objectToMap = obj => new Map(Object.entries(obj))

const collectionInto = fn => (...args) => fn(args)

// const Pall = collectionInto(Promise.all.bind(Promise));
// const p1 = Promise.resolve(1);
// const p2 = Promise.resolve(2);
// const p3 = new Promise(resolve => setTimeout(resolve, 2000, 3));
// Pall(p1, p2, p3).then(console.log);


const handler = {
    get: (obj, key) => {
        console.log(`Accessed property: ${key}`);
        return obj[key];
    },
    set: (obj, key, value) => {
        console.log(`Set property: ${key} = ${value}`);
        obj[key] = value;
    }
};

const methods = {
    name: 'hjk',

    _this: () => {
        console.log(this, 'test')
    },

    _this2: function () {
        console.log(this, 'test')
    }
}

// const proxy = new Proxy(user, handler)
// methods._this()
// methods._this2()

const once = fn => {
    let called = false
    return function (...args) {
        if (called) return
        called = true
        console.log(this, 'test')
        return fn.apply(this, args)
    }
}

const obj = {
    name: 'John',
    greet: function () {
        setTimeout(() => {
            console.log(`Hello, ${this.name}!`);
        }, 1000);
    }
};

// 일반함수는 호출 시점에서 동적으로, 화살표 함수는 정의 시점에 정적으로
// obj.greet()

const reverseString = str => [...str].reverse().join('')

const promisify = func => (...args) => {
    return new Promise((resolve, reject) => {
        func(...args, (err, result) => (err ? reject(err) : resolve(result)))
    });
}

const delay = promisify((d, cb) => {
    setTimeout(cb, d)
});
// delay(2000).then(() => console.log('Hi!')); // Prom

const timeLog = (text) => {
    setTimeout((text) => console.log(log), 1000, text)
}

const juxt = (...fns) => (...args) => [...fns].map(fn => [...args])

const forEachRight = (arr, callback) => arr.reverse().forEach(callback)

const findKeys = (obj, val) => Object.keys(obj).filter(key => obj[key] === val)

const filterUnique = arr => [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.indexOf(i))

const objs = {name: 'test', age: 10}

const deepClone = Object.assign({}, objs)
const deepCloneTwo = {...objs}
const shallowClone = objs
const {name, age} = objs
// console.log(deepClone, objs, deepClone === objs)
// console.log(shallowClone, objs, shallowClone === objs)
// console.log(name, age)


const compactJoin = (arr, delim = ',') => arr.filter(Boolean).join(delim)

const chainAsync = fns => {
    let curr = 0;
    const last = fns[fns.length - 1];
    const next = () => {
        const fn = fns[curr++];
        fn === last ? fn() : fn(next);
    };
    next();
};
// chainAsync([
//     next => {
//         console.log('0 seconds');
//         next()
//     },
//     next => {
//         console.log('1 second');
//         next()
//     },
//     () => {
//         console.log('2 second');
//     }
// ]);

const accumulate = (...nums) => nums.reduce((acc, num) => [...acc, num + (acc.slice(-1)[0] || 0)], 0)

let user = {name: 'test'}

const userName = undefined ?? user

const data = {
    user: {
        name: 'test'
    },

}


// 옵셔널체인
const u = data.user?.name
const s = data.user?.age

const dateRangeGenerator = function* (start, end, step = 1) {
    let d = start;
    while (d < end) {
        yield new Date(d);
        d.setDate(d.getDate() + step);
    }
};

const letScope = () => {
    {
        var a = 3
        // let a = 3
        console.log(a)
    }
    console.log(a)
}

const outerFunc = () => {
    const outerValue = 'test'

    const innerFunc = () => {
        console.log(outerValue)
    }

    return innerFunc
}

const closure = outerFunc()
closure()

const fibonacciNumber = n => {
    console.log(`[CALLED] fibonacciNumber(${n})`);
    const r = n >= 2 ? fibonacciNumber(n - 1) + fibonacciNumber(n - 2) : n;
    console.log(`[RETURN] ${r} for n=${n}`);
    return r;
}


fibonacciNumber(2)

const a = [4, 3, 1, 2]

const ranking = (arr, compareFunc) =>
    arr.map(a => arr.filter(b => compareFunc(a, b)).length + 1)

const cartesianProduct = (a, b) =>
    a.reduce((p, x) => [...p, ...b.map(y => [x, y])], [])

const arithmeticProgression = (n, lim) =>
    Array.from({length: Math.ceil(lim / n)}, (_, i) => (i + 1) * n)

const addMinutesToDate = (date, n) => {
    const d = new Date(date);
    d.setTime(d.getTime() + n * 60000);
    return d.toISOString().split('.')[0].replace('T', ' ');
};

const createShapeCheckerProxy = shape => {
    const types = {
        bool: v => typeof v === 'boolean',
        num: v => typeof v === 'number' && v === v,
        str: v => typeof v === 'string',
        date: v => v instanceof Date
    };
    const validProps = Object.keys(shape);

    const handler = {
        set(target, prop, value) {
            if (!validProps.includes(prop)) return false;
            const validator = types[shape[prop]];
            if (!validator || typeof validator !== 'function') return false;
            if (!validator(value)) return false;
            target[prop] = value;
        }
    };

    return obj => new Proxy(obj, handler);
};

const str = 'test2'
// switch(str) {
//     case 'test':
//         console.log('a')
//         break
//     case 'test2':
//         console.log('b')
//         break;
// }

const logStr = {
    'test': () => console.log('a'),
    'test2': () => console.log('b')
}

const sumPower = (end, power = 2, start = 1) =>
    Array(end + 1 - start)
        .fill(0)
        .map((x, i) => {
            return (i + start) ** power
        })
        .reduce((a, b) => a + b, 0);

// Flatten an array
const e = [[1, 2], [3, 4]];
const f = [...e[0], ...e[1]]; // f = [1, 2, 3, 4]

const ob = {name: 'test', age: 10}

const pick = (obj, arr) =>
    arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

const omit = (obj, arr) =>
    Object.keys(obj)
        .filter(k => !arr.includes(k))
        .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

const objectToQueryString = queryParameters => {
    return queryParameters
        ? Object.entries(queryParameters).reduce(
            (queryString, [key, val], index) => {
                const symbol = queryString.length === 0 ? '?' : '&';
                queryString +=
                    typeof val === 'string' ? `${symbol}${key}=${val}` : '';
                return queryString;
            },
            ''
        )
        : '';
};

const mergeSort = arr => {
    if (arr.length < 2) return arr;
    const mid = Math.floor(arr.length / 2);
    const l = mergeSort(arr.slice(0, mid));
    const r = mergeSort(arr.slice(mid, arr.length));
    return Array.from({length: l.length + r.length}, () => {
        if (!l.length) return r.shift();
        else if (!r.length) return l.shift();
        else return l[0] > r[0] ? r.shift() : l.shift();
    });
};
mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

const getHandler = {
    get: (target, prop) => {
        return value => {
            if (typeof value !== 'undefined') {
                target[prop] = value;
                return new Proxy(target, getHandler);
            }
            return target[prop];
        };
    }
};

const styles = {};
const proxiedStyles = new Proxy(styles, getHandler);

// proxiedStyles.color('#101010').background('#fefefe').margin('4px 8px');

const oba = {name: 'test'}
const obb = {...oba, age: 10}

const frequencies = arr =>
    arr.reduce((a, v) => {
        a[v] = (a[v] ?? 0) + 1
        return a
    }, {})

const transform = (obj, fn, acc) =>
    Object.keys(obj).reduce((a, k) => fn(a, obj[k], k, obj), acc);

const invertKeyValues = (obj, fn) =>
    Object.keys(obj).reduce((acc, key) => {
        const val = fn ? fn(obj[key]) : obj[key]
        acc[val] = acc[val] || []
        acc[val].push(key)
        return acc
    }, {})

const debounce = (func, delay) => {
    let timeoutId = 'test';

    return function () {
        const context = this;
        const args = arguments;

        clearTimeout(timeoutId);

        timeoutId = setTimeout(function () {
            func.apply(context, args);
        }, delay);
    };
}

const handleInput = () => {
    console.log('Input event debounced');
}

const debouncedHandleInput = debounce(handleInput, 300);
debouncedHandleInput()


const slice = [1, 2, 3]
slice.slice(1)
console.log(slice)

const groupBy = (arr, fn) =>
    arr.map(typeof fn === 'function' ? fn : val => val[fn])
        .reduce((acc, val, index) => {
            acc[val] = (acc[val] || []).concat(arr[index])
            return acc
        }, {})

// groupBy([6.1, 4.2, 6.3], Math.floor); // {4: [4.2], 6: [6.1, 6.3]}
// groupBy(['one', 'two', 'three'], 'length'); // {3: ['one', 'two'], 5: ['three']}

const reducedFilter = (dta, keys, fn) =>
    data.filter(fn).map(el => {
        keys.reduce((acc, key) => {
            acc[key] = el[key]
            return acc
        }, {})
    })

const indexOn = (arr, key) => {
    return arr.reduce((obj, v) => {
        const {[key]: id, ...data} = v
        console.log(id)
        obj[id] = data
        return obj
    }, {})
}



const runPromisesInSeries = ps =>
    ps.reduce((p, next) => p.then(next), Promise.resolve());

const delays = (d, text) => new Promise(r => setTimeout(() => {
    console.log(text)
}, d, text));
// runPromisesInSeries([() => delays(2000, 'com'), () => delays(1000, 'com1')]);

const sleeps = ms =>
    new Promise(resolve => setTimeout(resolve, ms))



const printNums = async () => {
    console.log(1);
    await sleeps(1500);
    console.log(2);
    console.log(3);
};


const queryStringToObject = url =>
    [...new URLSearchParams(url.split('?')[1])].reduce(
        (a, [k, v]) => {
            return ((a[k] = v), a)
        },
        {}
    );

// console.log(queryStringToObject('https://google.com?page=1&count=10'))

const isFalsy = value => !value;

// isFalsy(null); // true
// isFalsy(undefined); // true
// isFalsy(0); // true
// isFalsy(false); // true
// isFalsy(''); // true
// isFalsy(NaN); // true

const isFalsy = value => !value;
const isWhitespaceString = value =>
    typeof value === 'string' && /^\s*$/.test(value);
const isEmptyCollection = value =>
    (Array.isArray(value) || value === Object(value)) &&
    !Object.keys(value).length;
const isInvalidDate = value =>
    value instanceof Date && Number.isNaN(value.getTime());
const isEmptySet = value => value instanceof Set && value.size === 0;
const isEmptyMap = value => value instanceof Map && value.size === 0;