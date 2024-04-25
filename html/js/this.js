class Test {
    name = 'test'
    test = () => {
        console.log(this, this.name)
    }
    test2() {
        console.log(this, this.name)
    }
}

const test2 = {
    name: 'test',
    test: () => {
        console.log(this, this.name)
    },
    test2: function() {
        console.log(this, this.name)
    }
}
const test = new Test()
test.test()
test.test2()
test2.test()
test2.test2()



