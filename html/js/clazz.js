class DoublyLinkedList {
    constructor() {
        this.nodes = []
    }

    get size() {
        return this.nodes.length
    }

    get head() {
        return this.size ? this.nodes[0] : null
    }

    get tail() {
        return this.size ? this.nodes[this.size - 1] : null
    }

    insertAt(index, value) {
        const previousNode = this.nodes[index - 1] || null
        const nextNode = this.nodes[index] || null
        const node = {value, next: nextNode, previous: previousNode}

        if (previousNode) previousNode.next = node
        if (nextNode) nextNode.previous = node
        this.nodes.splice(index, 0, node)
    }

    insertFirst(value) {
        this.insertAt(0, value)
    }

    insertLast(value) {
        this.insertAt(this.size, value)
    }

    getAt(index) {
        return this.nodes[index]
    }

    removeAt(index) {
        const previousNode = this.nodes[index - 1] || null
        const nextNode = this.nodes[index + 1] || null

        if (previousNode) previousNode.next = nextNode
        if (nextNode) nextNode.previous = previousNode
        return this.nodes.splice(index, 1)
    }

    clear() {
        this.nodes = []
    }

    reverse() {
        this.nodes = this.nodes.reduce((acc, {value}) => {
            const nextNode = acc[0] || null
            const node = {value, next: nextNode, previous: null}
            if (nextNode) nextNode.previous = node
            return [node, ...acc]
        }, [])
    }

    * [Symbol.iterator]() {
        yield* this.nodes
    }
}


const list = new DoublyLinkedList();
const size = list.size
list.insertAt(0, 1)
list.insertAt(1, 2)
list.insertAt(2, 3)
list.reverse()
console.log(list)
//
// const arr = [1, 2, 3]
// const reverse = arr.reduce((acc, value) => {
//     return [value, ...acc]
// }, [])


// graph
class Graph {
    constructor(directed = true) {
        this.directed = directed
        this.nodes = []
        this.edges = new Map()
    }

    addNode(key, value = key) {
        this.nodes.push({key, value})
    }

    addEdge(a, b, weight) {
        this.edges.set(JSON.stringify([a, b]), {a, b, weight})
        if (!this.directed) {
            this.edges.set(JSON.stringify([b, a]), {a: b, b: a, weight})
        }
    }

    removeNode(key) {
        this.nodes = this.nodes.filter(n => n.key !== key);
        [...this.edges.values()].forEach(({a, b}) => {
            if (a === key || b === key) this.edges.delete(JSON.stringify([a, b]))
        })
    }

    removeEdge(a, b) {
        this.edges.delete(JSON.stringify([a, b]))
        if (!this.directed) this.edges.delete(JSON.stringify([b, a]))
    }

    findNode(key) {
        return this.nodes.find(x => x.key === key)
    }

    hasEdge(a, b) {
        return this.edges.has(JSON.stringify([a, b]))
    }

    setEdgeWeight(a, b, weight) {
        this.edges.set(JSON.stringify([a, b]), {a, b, weight});
        if (!this.directed)
            this.edges.set(JSON.stringify([b, a]), {a: b, b: a, weight});
    }

    getEdgeWeight(a, b) {
        return this.edges.get(JSON.stringify([a, b])).weight;
    }

    adjacent(key) {
        return [...this.edges.values()].reduce((acc, {a, b}) => {
            if (a === key) acc.push(b)
            return acc
        }, [])
    }

    indegree(key) {
        return [...this.edges.values()].reduce((acc, {a, b}) => {
            if (b === key) acc++;
            return acc;
        }, 0);
    }

    outdegree(key) {
        return [...this.edges.values()].reduce((acc, {a, b}) => {
            if (a === key) acc++;
            return acc;
        }, 0);
    }
}

const map = new Map()
map.set(JSON.stringify(['a', 'b']), {a: 'a', c: 'b'});
console.log(map.values());
[...map.values()].forEach(({a, b}) => {
    console.log(a, b)
})

class Queue {
    constructor() {
        this.items = []
    }

    enqueue(item) {
        this.items.push(item)
    }

    dequeue() {
        return this.items.shift()
    }

    peek() {
        return this.items[0]
    }

    isEmpty() {
        return this.items.length === 0
    }
}


class Timeout {
    constructor() {
        this.ids = [];
    }

    set = (delay, reason) =>
        new Promise((resolve, reject) => {
            const id = setTimeout(() => {
                if (reason === undefined) resolve();
                else reject(reason);
                this.clear(id);
            }, delay);
            this.ids.push(id);
        });

    wrap = (promise, delay, reason) =>
        Promise.race([promise, this.set(delay, reason)]);

    clear = (...ids) => {
        this.ids = this.ids.filter(id => {
            if (ids.includes(id)) {
                clearTimeout(id);
                return false;
            }
            return true;
        });
    };
}

class BinarySearchTreeNode {
    constructor(key, value = key, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    get isLeaf() {
        return this.left === null && this.right === null;
    }

    get hasChildren() {
        return !this.isLeaf;
    }
}

class BinarySearchTree {
    constructor(key, value = key) {
        this.root = new BinarySearchTreeNode(key, value);
    }

    *inOrderTraversal(node = this.root) {
        if (node.left) yield* this.inOrderTraversal(node.left);
        yield node;
        if (node.right) yield* this.inOrderTraversal(node.right);
    }

    *postOrderTraversal(node = this.root) {
        if (node.left) yield* this.postOrderTraversal(node.left);
        if (node.right) yield* this.postOrderTraversal(node.right);
        yield node;
    }

    *preOrderTraversal(node = this.root) {
        yield node;
        if (node.left) yield* this.preOrderTraversal(node.left);
        if (node.right) yield* this.preOrderTraversal(node.right);
    }

    insert(key, value = key) {
        let node = this.root;
        while (true) {
            if (node.key === key) return false;
            if (node.key > key) {
                if (node.left !== null) node = node.left;
                else {
                    node.left = new BinarySearchTreeNode(key, value, node);
                    return true;
                }
            } else if (node.key < key) {
                if (node.right !== null) node = node.right;
                else {
                    node.right = new BinarySearchTreeNode(key, value, node);
                    return true;
                }
            }
        }
    }

    has(key) {
        for (let node of this.postOrderTraversal()) {
            if (node.key === key) return true;
        }
        return false;
    }

    find(key) {
        for (let node of this.postOrderTraversal()) {
            if (node.key === key) return node;
        }
        return undefined;
    }

    remove(key) {
        const node = this.find(key);
        if (!node) return false;
        const isRoot = node.parent === null;
        const isLeftChild = !isRoot ? node.parent.left === node : false;
        const hasBothChildren = node.left !== null && node.right !== null;

        if (node.isLeaf) {
            if (!isRoot) {
                if (isLeftChild) node.parent.left = null;
                else node.parent.right = null;
            } else {
                this.root = null;
            }
            return true;
        } else if (!hasBothChildren) {
            const child = node.left !== null ? node.left : node.right;
            if (!isRoot) {
                if (isLeftChild) node.parent.left = child;
                else node.parent.right = child;
            } else {
                this.root = child;
            }
            child.parent = node.parent;
            return true;
        } else {
            const rightmostLeft = [...this.inOrderTraversal(node.left)].slice(-1)[0];
            rightmostLeft.parent = node.parent;
            if (!isRoot) {
                if (isLeftChild) node.parent.left = rightmostLeft;
                else node.parent.right = rightmostLeft;
            } else {
                this.root = rightmostLeft;
            }
            rightmostLeft.right = node.right;
            node.right.parent = rightmostLeft;
            return true;
        }
    }
}



class TreeNode {
    constructor(key, value = key, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.children = [];
    }

    get isLeaf() {
        return this.children.length === 0;
    }

    get hasChildren() {
        return !this.isLeaf;
    }
}

class Tree {
    constructor(key, value = key) {
        this.root = new TreeNode(key, value);
    }

    *preOrderTraversal(node = this.root) {
        yield node;
        if (node.children.length) {
            for (let child of node.children) {
                yield* this.preOrderTraversal(child);
            }
        }
    }

    *postOrderTraversal(node = this.root) {
        if (node.children.length) {
            for (let child of node.children) {
                yield* this.postOrderTraversal(child);
            }
        }
        yield node;
    }

    insert(parentNodeKey, key, value = key) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === parentNodeKey) {
                node.children.push(new TreeNode(key, value, node));
                return true;
            }
        }
        return false;
    }

    remove(key) {
        for (let node of this.preOrderTraversal()) {
            const filtered = node.children.filter(c => c.key !== key);
            if (filtered.length !== node.children.length) {
                node.children = filtered;
                return true;
            }
        }
        return false;
    }

    find(key) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === key) return node;
        }
        return undefined;
    }
}



class BinaryTreeNode {
    constructor(key, value = key, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    get isLeaf() {
        return this.left === null && this.right === null;
    }

    get hasChildren() {
        return !this.isLeaf;
    }
}

class BinaryTree {
    constructor(key, value = key) {
        this.root = new BinaryTreeNode(key, value);
    }

    *inOrderTraversal(node = this.root) {
        if (node.left) yield* this.inOrderTraversal(node.left);
        yield node;
        if (node.right) yield* this.inOrderTraversal(node.right);
    }

    *postOrderTraversal(node = this.root) {
        if (node.left) yield* this.postOrderTraversal(node.left);
        if (node.right) yield* this.postOrderTraversal(node.right);
        yield node;
    }

    *preOrderTraversal(node = this.root) {
        yield node;
        if (node.left) yield* this.preOrderTraversal(node.left);
        if (node.right) yield* this.preOrderTraversal(node.right);
    }

    insert(
        parentNodeKey,
        key,
        value = key,
        { left, right } = { left: true, right: true }
    ) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === parentNodeKey) {
                const canInsertLeft = left && node.left === null;
                const canInsertRight = right && node.right === null;
                if (!canInsertLeft && !canInsertRight) return false;
                if (canInsertLeft) {
                    node.left = new BinaryTreeNode(key, value, node);
                    return true;
                }
                if (canInsertRight) {
                    node.right = new BinaryTreeNode(key, value, node);
                    return true;
                }
            }
        }
        return false;
    }

    remove(key) {
        for (let node of this.preOrderTraversal()) {
            if (node.left.key === key) {
                node.left = null;
                return true;
            }
            if (node.right.key === key) {
                node.right = null;
                return true;
            }
        }
        return false;
    }

    find(key) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === key) return node;
        }
        return undefined;
    }
}


const asyncUppercase = item =>
    new Promise(resolve =>
        setTimeout(
            () => resolve(item.toUpperCase()),
            Math.floor(Math.random() * 1000)
        )
    );

const uppercaseItems = async () => {
    const items = ['a', 'b', 'c'];
    for (item of items) {
        const uppercaseItem = await asyncUppercase(item);
        console.log(uppercaseItem);
    }

    console.log('Items processed');
};

uppercaseItems();
// LOGS: 'A', 'B', 'C', 'Items processed'






class LinkedList {
    constructor(data) {
        this.data = data;
    }

    firstItem() {
        return this.data.find(i => i.head);
    }

    findById(id) {
        return this.data.find(i => i.id === id);
    }

    [Symbol.iterator]() {
        let item = { next: this.firstItem().id };
        return {
            next: () => {
                item = this.findById(item.next);
                if (item) {
                    return { value: item.value, done: false };
                }
                return { value: undefined, done: true };
            },
        };
    }
}

const myList = new LinkedList([
    { id: 'a10', value: 'First', next: 'a13', head: true },
    { id: 'a11', value: 'Last', next: null, head: false },
    { id: 'a12', value: 'Third', next: 'a11', head: false },
    { id: 'a13', value: 'Second', next: 'a12', head: false },
]);

for (let item of myList) {
    console.log(item); // 'First', 'Second', 'Third', 'Last'
}




const toKeyedArray = obj => {
    const methods = {
        map(target) {
            return callback =>
                Object.keys(target).map(key => callback(target[key], key, target));
        },
        reduce(target) {
            return (callback, accumulator) =>
                Object.keys(target).reduce(
                    (acc, key) => callback(acc, target[key], key, target),
                    accumulator
                );
        },
        forEach(target) {
            return callback =>
                Object.keys(target).forEach(key => callback(target[key], key, target));
        },
        filter(target) {
            return callback =>
                Object.keys(target).reduce((acc, key) => {
                    if (callback(target[key], key, target)) acc[key] = target[key];
                    return acc;
                }, {});
        },
        slice(target) {
            return (start, end) => Object.values(target).slice(start, end);
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
    };
    const methodKeys = Object.keys(methods);

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
};

// Object creation
const x = toKeyedArray({ a: 'A', b: 'B' });

// Accessing properties and values
x.a;          // 'A'
x.keys;       // ['a', 'b']
x.values;     // ['A', 'B']
[...x];       // ['A', 'B']
x.length;     // 2

// Inserting values
x.c = 'c';    // x = { a: 'A', b: 'B', c: 'c' }
x.length;     // 3

// Array methods
x.forEach((v, i) => console.log(`${i}: ${v}`)); // LOGS: 'a: A', 'b: B', 'c: c'
x.map((v, i) => i + v);                         // ['aA', 'bB, 'cc]
x.filter((v, i) => v !== 'B');                  // { a: 'A', c: 'c' }
x.reduce((a, v, i) => ({ ...a, [v]: i }), {}); 	// { A: 'a', B: 'b', c: 'c' }
x.slice(0, 2);                                  // ['A', 'B']
x.slice(-1);                                    // ['c']
x.find((v, i) => v === i);                      // 'c'
x.findKey((v, i) => v === 'B');                 // 'b'
x.includes('c');                                // true
x.includes('d');                                // false
x.keyOf('B');                                   // 'b'
x.keyOf('a');                                   // null
x.lastKeyOf('c');                               // 'c'