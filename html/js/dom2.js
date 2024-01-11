const $ = (dom) => {
    return document.querySelector(dom)
}

const container = $('#container')
const select = $('#select')
const id = $('#id')
const passowrd = $('#password')
let data

axios.defaults.proxy = {
    protocol: 'https',
    host: 'proxy.hoppscotch.io',
}

const sibiling = (element) => {
    return [...element.parentNode.children].filter(node => node !== element)
}

const getSelected = (element) => {
    let selected;
    [...element].map(node => {
        if (node.selected) {
            selected = node.value
        }
    })
    return selected
}

const getValue = (element) => {
    return element.value
}

const log = (...elements) => {
    console.log(...elements)
}

window.onload = async () => {
    id.onkeyup = (_this) => {
        console.log(_this.target.value)
    }


    getValue(id, passowrd)

    const res = await getRequest('http://localhost:8080/index')
    console.log(res)
}



const getRequest = async (url) => {
    try {
        const res = await axios.get(url)
        data = {
            status: 200, data: res.data
        }
    } catch (err) {
        data = {
            status: 500, data: err
        }
    }
    return data
}


