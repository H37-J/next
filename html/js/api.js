const controller = new AbortController()
const {signal} = controller

fetch('https://www.google.com/', {signal}).then(res => console.log(res))

controller.abort()