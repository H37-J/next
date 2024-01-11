interface UserMethod {
    setName(name: string): void
}

class Type {
    age?: number
    name?: string
    mail?: string

    setName(name: string): void {
        this.name = name
    }
}

const user = new Type()
user.age = 3
user.name = 'hjk'
console.log(user)

const someClass = class<Type> {
    value: Type

    constructor(value: Type) {
        this.value = value
    }
}

const clazz = new someClass('test')
type UserInstance = InstanceType<typeof Type>

type Flatten<T> = T extends any[] ? T[number] : T
type str = Flatten<string[]>
type num = Flatten<number[]>

type ToArray<Type> = Type extends string ? Type[] : never
type test = ToArray<string | number>

function identity<Type>(arg: Type): Type {
    return arg
}

const output = identity<string>('str')

interface LengthWise {
    length: number
}

function loggingIdentity<Type extends LengthWise>(arg: Type): Type {
    console.log(arg.length)
    return arg
}

// function loggingIdentityWithError<Type>(arg: Type): Type {
//     console.log(arg.length)
//     return arg
// }

loggingIdentity({length: 10, value: 3})

const getProperty = <Type, Key extends keyof Type>(obj: Type, key: Key) => {
    return obj[key];
}

let x = {a: 1, b: 2, c: 3, d: 4}

class Animal {
    numLengs: number = 4
}

class ZooKeeper {
    neaetag: string = 'Mikle'
}

class Lione extends Animal {
    keepper: ZooKeeper = new ZooKeeper()
}

const createInstance = <A extends Animal>(c: new() => A): A => {
    return new c();
}

const combine = <Type>(arr1: Type[], arr2: Type[]): Type[] => {
    return arr1.concat(arr2)
}

const arr = combine<number | string>([1,2,3], ['hello'])
