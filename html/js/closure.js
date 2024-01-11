const initCounter = (start = 0) => {
    let value = start;
    return {
        get: () => value,
        increment: () => ++value,
        decrement: () => --value,
        reset: () => value = start
    };
}

const counter = initCounter(5);
counter.get(); // 5
counter.increment(); // 6
counter.increment(); // 7
counter.decrement(); // 6
counter.reset(); // 5