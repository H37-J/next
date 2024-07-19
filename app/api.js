const {contextBridge, ipcRenderer} = require('electron');
const axios = require('axios');
const puppeteer = require('puppeteer')



contextBridge.exposeInMainWorld('electronAPI', {
    handleClick: (callback) => ipcRenderer.on('button-click', callback),
    sendClick: () => ipcRenderer.send('button-click'),
    crawling: (search, sort, paging) => crawling(search, sort, paging),
    someValue: 'Hello from preload'
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const crawling = async (search, sort, paging) => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 1200,
            height: 1440
        },
        protocolTimeout: 620000000
    })

    const page = await browser.newPage()

    let url = 'https://www.coupang.com/np/search'
    url = new URL(url)
    const params = new URLSearchParams(url.search)
    params.append('q', search)
    params.append('sorter', sort)
    params.append('page', paging)
    url.search = params.toString()
    url = url.toString()

    await page.goto(url)

    await delay(1000)

    let element
    element = await page.$('#\\37 975088314 > a > dl > dd > div > div.name')
    const title = await element.evaluate(el => el.textContent)
    console.log(title)

    await delay(5000)

    await browser.close()
}


window.onload = () => {
}