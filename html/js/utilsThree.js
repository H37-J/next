const chunkify = function* (itr, size) {
    let chunk = []
    for (const v of itr) {
        chunk.push(v)
        if(chunk.length === size) {
            yield chunk
            chunk = []
        }
    }
    if(chunk.length) yield chunk
}

const x = new Set([1, 2, 1, 3, 4, 1, 2, 5]);

// [...chunkify(x, 2)]; // [[1, 2], [3, 4], [5]]

const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );


const obj = { a: 1, b: 2, c: 3 };
const objEntries = Object.entries(obj);
// ['a', 1], ['b', 2], ['c', 3]
for (const [key, value] of objEntries)
    console.log(`${key}: ${value}`);

const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
const mapEntries = [...map.entries()]; // Same as [...map]
// [['a', 1], ['b', 2], ['c', 3]]
for (const [key, value] of map)
    console.log(`${key} => ${value}`);







const createEventHub = () => ({
    hub: Object.create(null),
    emit(event, data) {
        (this.hub[event] || []).forEach(handler => handler(data));
    },
    on(event, handler) {
        if (!this.hub[event]) this.hub[event] = [];
        this.hub[event].push(handler);
    },
    off(event, handler) {
        const i = (this.hub[event] || []).findIndex(h => h === handler);
        if (i > -1) this.hub[event].splice(i, 1);
        if (this.hub[event].length === 0) delete this.hub[event];
    }
});

const handler = data => console.log(data);
const hub = createEventHub();
let increment = 0;

// Subscribe: listen for different types of events
hub.on('message', handler);
hub.on('message', () => console.log('Message event fired'));
hub.on('increment', () => increment++);

// Publish: emit events to invoke all handlers subscribed to them, passing the data to them as an argument
hub.emit('message', 'hello world'); // logs 'hello world' and 'Message event fired'
hub.emit('message', { hello: 'world' }); // logs the object and 'Message event fired'
hub.emit('increment'); // `increment` variable is now 1

// Unsubscribe: stop a specific handler from listening to the 'message' event
hub.off('message', handler);



const singletonify = (className) => {
    return new Proxy(className.prototype.constructor, {
        instance: null,
        construct: (target, argumentsList) => {
            if (!this.instance)
                this.instance = new target(...argumentsList);
            return this.instance;
        }
    });
}


class MyClass {
    constructor(msg) {
        this.msg = msg;
    }

    printMsg() {
        console.log(this.msg);
    }
}

MySingletonClass = singletonify(MyClass);

const myObj = new MySingletonClass('first');
myObj.printMsg();           // 'first'
const myObj2 = new MySingletonClass('second');
myObj2.printMsg();           // 'first'


const formatDuration = ms => {
    if (ms < 0) ms = -ms;
    const time = {
        day: Math.floor(ms / 86400000),
        hour: Math.floor(ms / 3600000) % 24,
        minute: Math.floor(ms / 60000) % 60,
        second: Math.floor(ms / 1000) % 60,
        millisecond: Math.floor(ms) % 1000
    };
    return Object.entries(time)
        .filter(val => val[1] !== 0)
        .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
        .join(', ');
};

formatDuration(1001); // '1 second, 1 millisecond'
formatDuration(34325055574);
// '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'


const runAsync = fn => {
    const worker = new Worker(
        URL.createObjectURL(new Blob([`postMessage((${fn})());`]), {
            type: 'application/javascript; charset=utf-8'
        })
    );
    return new Promise((res, rej) => {
        worker.onmessage = ({ data }) => {
            res(data), worker.terminate();
        };
        worker.onerror = err => {
            rej(err), worker.terminate();
        };
    });
};

const iterableXx = {
    [Symbol.iterator]: function* () {
        yield 1;
        yield 2;
    }
};

console.log([...iterableXx]); // [1, 2]


const range = (end, start = 0, step = 1) => {
    function* generateRange() {
        let x = start - step;
        while(x < end - step) yield x += step;
    }
    return {
        [Symbol.iterator]: generateRange
    };
}

console.log([...range(7)]); // [0, 1, 2, 3, 4, 5, 6]
for (let i of range(8, 2, 2)) console.log(i); // Logs: 2, 4, 6







const memoize = fn => new Proxy(fn, {
    cache: new Map(),
    apply (target, thisArg, argsList) {
        let cacheKey = argsList.toString();
        if(!this.cache.has(cacheKey))
            this.cache.set(cacheKey, target.apply(thisArg, argsList));
        return this.cache.get(cacheKey);
    }
});

const fibonacci = n => (n <= 1 ? 1 : fibonacci(n - 1) + fibonacci(n - 2));
const memoizedFibonacci = memoize(fibonacci);

for (let i = 0; i < 100; i ++)
    fibonacci(30);                      // ~5000ms
for (let i = 0; i < 100; i ++)
    memoizedFibonacci(30);              // ~50ms