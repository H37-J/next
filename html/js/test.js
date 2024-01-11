let num1 = 1
let num2 = 2

const test = (num1, num2) => {
    num1 = 3
    num2 = 4
    return [num1, num2]
}

[num1, num2] = test(num1, num2)

console.log(num1, num2)
