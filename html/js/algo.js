const fibo = n => {
    if (n <= 1) return n
    return fibo(n - 1) + fibo(n - 2)
}

const prod = (...arr) => [...arr].reduce((acc, val) => acc * val, 1)

const partial = (fn, ...partials) => (...args) => fn(...partials, ...args)

const greet = (greeting, name) => greeting + ' ' + name + '!'
const greetHello = partial(greet, 'Helo')
greetHello('john')

const lastDateOfMonth = (date = new Date()) => {
    let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return d.toISOString().split('T')[0];
};

const includesCaseInsensitive = (str, searchString) =>
    new RegExp(searchString, 'i').test(str);

const findLastN = (arr, matcher, n = 1) => {
    let res = []
    for (let i = arr.length - 1; i >= 0; i--) {
        const el = arr[i]
        const match = matcher(el, i, arr)
        if (match) res.unshift(el)
        if (res.length === n) return res
    }
    return res
}

const average = (...nums) => {
    return nums.reduce((acc, val) => acc + val, 0) / nums.length
}

const similarity = (arr, values) => {
    arr.filter(v => values.include(arr))
}

const binarySearch = (arr, item) => {
    let l = 0, r = arr.length - 1
    while (l <= r) {
        const mid = Math.floor((l + r) / 2)
        const guess = arr[mid]
        if (guess > item) r = mid - 1
        else l = mid + 1
    }
    return -1
}


const s = ['Hi', 'Hola', 'Hello'];
s.sort((a, b) => a.localeCompare(b));

const lengthSort = (arr, fn) => {
    return arr.sort((a, b) => fn(a) - fn(b))
}

const res = lengthSort(['te', 't'], str => str.length)

let sum = 0
const recur = num => {
    return num === 1 ? num : num + recur(num - 1)
}

const randomNumbers = function* (count) {
    for (let i = 0; i < count; i++) {
        yield Math.floor(Math.random() * 10);
    }
}

const generator = randomNumbers(5);

// console.log(generator.next().value);
// console.log(generator.next().value);
// console.log(generator.next().value);
// console.log(generator.next().value);
// console.log(generator.next().value);
// console.log(generator.next().value);

const sortCharactersInString = str => [...str].sort((a, b) => a.localeCompare(b)).join('')

const insertionSort = arr =>
    arr.reduce((acc, x) => {
        if (!acc.length) return [x];
        acc.some((y, j) => {
            if (x <= y) {
                acc.splice(j, 0, x);
                return true;
            }
            if (x > y && j === acc.length - 1) {
                acc.splice(j + 1, 0, x);
                return true;
            }
            return false;
        });
        return acc;
    }, []);

const arr = [1, 2, 3, 4]
arr.reduce((a, b) => {
    return b
})

const gcd = (...arr) => {
    const _gcd = (x, y) => (!y ? x : gcd(y, x % y));
    return [...arr].reduce((a, b) => _gcd(a, b));
};

const bubbleSort = arr => {
    let swapped = false;
    const a = [...arr];
    for (let i = 1; i < a.length; i++) {
        swapped = false;
        for (let j = 0; j < a.length - i; j++) {
            if (a[j + 1] < a[j]) {
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
                swapped = true;
            }
        }
        if (!swapped) return a;
    }
    return a;
};

const powerset = arr =>
    arr.reduce((a, v) => {
        return a.concat(a.map(r => r.concat(v)))
    }, [[]]);

powerset([1, 2])

const partitionBy = (arr, fn) =>
    arr.reduce(
        ({res, last}, v, i, a) => {
            const next = fn(v, i, a)
            if (next !== last) res.push([v])
            else res[res.length - 1].push(v)
            return {res, last: next}
        },
        {res: []}
    ).res

const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n)

const a = [4, 2, 3]
const {0: first, length, [length - 1]: last} = a

const stringPermutations = str => {
    if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
    return str
        .split('')
        .reduce(
            (acc, letter, i) => {
                return acc.concat(
                    stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
                        val => {
                            return letter + val
                        }
                    )
                )
            },
            []
        );
};
stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

const str = 'abc'
const ts = str.slice(0, 0) + str.slice(1)

const pullAtIndex = (arr, pullArr) => {
    let removed = [];
    let pulled = arr
        .map((v, i) => (pullArr.includes(i) ? removed.push(v) : v))
        .filter((v, i) => !pullArr.includes(i));
    arr.length = 0;
    pulled.forEach(v => arr.push(v));
    return removed;
};

const handler = {
    get(target, key, receiver) {
        const index = Number(key);
        const prop = index < 0 ? `${target.length + index}` : key;
        return Reflect.get(target, prop, receiver);
    },
};

const throttle = (fn, wait) => {
    let inThrottle, lastFn, lastTime;
    return function () {
        const context = this,
            args = arguments;
        if (!inThrottle) {
            fn.apply(context, args);
            lastTime = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(function () {
                if (Date.now() - lastTime >= wait) {
                    fn.apply(context, args);
                    lastTime = Date.now();
                }
            }, Math.max(wait - (Date.now() - lastTime), 0));
        }
    };
};

const primes = num => {
    let arr = Array.from({length: num - 1}).map((x, i) => i + 2)
    const sqroot = Math.floor(Math.sqrt(num))
    const numsTillSqroot = Array.from({length: sqroot - 1}).map((x, i) => i + 2);
    numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
    return arr;
};

const countSubStrings = (str, searchValue) => {
    let count = 0, start = 0
    while (true) {
        const index = str.indexOf(searchValue, start)
        if (index !== -1) [count, start] = [count + 1, index + 1]
        else return count
    }
}

const objectify = (arr, mapKey, mapValue = i => i) =>
    arr.reduce((acc, item) => {
        acc[mapKey(item)] = mapValue(item);
        return acc;
    }, {});

const mapValues = (obj, fn) =>
    Object.keys(obj).reduce((acc, k) => {
        acc[k] = fn(obj[k], k, obj)
        return acc
    }, {})

const dig = (obj, target) =>
    target in obj ? obj[target]
        : Object.values(obj).reduce((acc, val) => {
            if (acc !== undefined) return acc
            if (typeof val === 'object') return dig(val, target)
        }, undefined)

const deepFreeze = obj => {
    Object.keys(obj).forEach(prop => {
        if (typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) deepFreeze(obj[prop])
    })
    return Object.freeze(obj)
}

const selectionSort = arr => {
    const a = [...arr];
    for (let i = 0; i < a.length; i++) {
        const min = a
            .slice(i + 1)
            .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
        if (min !== i) [a[i], a[min]] = [a[min], a[i]];
    }
    return a;
};

// this

// Object context
const obj = {
    s: 'test',
    f: () => {
        return this
    }
}


// const myObj = Object.create(obj);
// myObj.foo = 1;

console.log(obj.f()); // { foo: 1 }

// const f = () => this;
//
// console.log(f() === window); // true

const objs = {
    foo: function () {
        const baz = () => this;
        return baz();
    },
    bar: () => this
};

console.log(objs.foo()); // { foo, bar }
// console.log(objs.bar() === window); // true

const quickSort = arr => {
    const a = [...arr];
    if (a.length < 2) return a;
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = a[pivotIndex];
    const [lo, hi] = a.reduce(
        (acc, val, i) => {
            if (val < pivot || (val === pivot && i != pivotIndex)) {
                acc[0].push(val);
            } else if (val > pivot) {
                acc[1].push(val);
            }
            return acc;
        },
        [[], []]
    );
    return [...quickSort(lo), pivot, ...quickSort(hi)];
};


const bucketSort = (arr, size = 5) => {
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const buckets = Array.from(
        {length: Math.floor((max - min) / size) + 1},
        () => []
    );
    arr.forEach(val => {
        buckets[Math.floor((val - min) / size)].push(val);
    });
    return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

const unzip = arr =>
    arr.reduce(
        (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
        Array.from({
            length: Math.max(...arr.map(x => x.length))
        }).map(x => [])
    );

const heapsort = arr => {
    const a = [...arr];
    let l = a.length;

    const heapify = (a, i) => {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        let max = i;
        if (left < l && a[left] > a[max]) max = left;
        if (right < l && a[right] > a[max]) max = right;
        if (max !== i) {
            [a[max], a[i]] = [a[i], a[max]];
            heapify(a, max);
            console.log(a)
        }
    };

    for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
    // for (i = a.length - 1; i > 0; i--) {
    //     [a[0], a[i]] = [a[i], a[0]];
    //     l--;
    //     heapify(a, 0);
    // }
    return a;
};

const permutations = arr => {
    if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
    return arr.reduce(
        (acc, item, i) =>
            acc.concat(
                permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(val => [
                    item,
                    ...val,
                ])
            ),
        []
    );
};
