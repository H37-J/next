const {contextBridge, ipcRenderer} = require('electron');
const axios = require('axios');
const puppeteer = require('puppeteer')



contextBridge.exposeInMainWorld('electronAPI', {
    handleClick: (callback) => ipcRenderer.on('button-click', callback),
    sendClick: () => ipcRenderer.send('button-click'),
    crawling: () => crawling(),
    someValue: 'Hello from preload'
});


const $ = document.querySelector.bind(document)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


const crawling = async () => {

    // const keyword = $("#keyword").value
    // const sort = $('#category1').value
    // const paging = $('#paging').value

    const keyword = '맥북'
    const sort = 'scoreDesc'
    const paging = 3






    let rank = 1
    for(let p = 1; p <= paging; p++) {
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
        params.append('page', p)
        params.append('q', keyword)
        params.append('sorter', sort)
        url.search = params.toString()
        url = url.toString()
        console.log(keyword, sort, p, url)

        await page.goto(url)
        await delay(5000)

        let element
        const list = await page.$('#productList')
        const names = await list.$$eval('li.search-product:not(.search-product__ad-badge) .name', elements => {
            return elements.map(element => element.textContent)
        })
        const prices = await list.$$eval('li.search-product:not(.search-product__ad-badge) .price-value', elements => {
            return elements.map(element => element.textContent)
        })
        const rates = await list.$$eval('li.search-product:not(.search-product__ad-badge) .rating-total-count', elements => {
            return elements.map(element => element.textContent)
        })
        const images = await list.$$eval('li.search-product:not(.search-product__ad-badge) .search-product-wrap-img', elements => {
            return elements.map(element => element.src)
        })

        const tbody = $('tbody')
        console.log(names)
        for(let i = 0; i < names.length; i++) {
            const tr = document.createElement('tr')
            tr.classList = 'border-b border-neutral-800 bg-black hover:bg-gray-600 cursor-pointer'
            const td1 = document.createElement('td')
            const td2 = document.createElement('td')
            const td3 = document.createElement('td')
            const td4 = document.createElement('td')
            const td5 = document.createElement('td')
            const img = document.createElement('img')
            td1.classList = 'p-4'
            img.classList = 'w-16 h-auto'
            td2.classList = 'px-6 py-4 font-semibold'
            td3.classList = 'px-6 py-4'
            td4.classList = 'px-6 py-4'
            td5.classList = 'px-6 py-4'
            img.src = images[i]
            td1.appendChild(img)
            td2.textContent = names[i]
            td3.textContent = prices[i]
            td4.textContent = rates[i]
            td5.textContent = rank
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
            tr.appendChild(td5)
            tbody.appendChild(tr)
            rank++

            const p = document.createElement('p')
            const time = document.createElement('span')
            const exec = document.createElement('span')
            let now = new Date();
            now = now.toISOString().slice(0, 19).replace('T', ' ');
            const terminal = $('#terminal')
            const command =  $('command')


        }
        await page.close()
        await browser.close()
    }

    await delay(5000)
}


window.onload = () => {
}