const x = x => x + 1
// Promise.resolve(5).then(res => console.log(res))

const pipeAsyncFunctions = (...fns) => arg => {
    return fns.reduce((p, f) => p.then(f), Promise.resolve(arg));
}

const sum = pipeAsyncFunctions(
    x => x + 1,
    x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
    x => x + 3,
    async x => (await x) + 4
);

(async() => {
    console.log(await sum(5));
})();

const indexOfSubstrings = function* (str, searchValue) {
    let i = 0
    while(true) {
        const r= str.indexOf(searchValue, i)
        if(r !== -1) {
            yield r
            i = r + 1
        } else return
    }
};

