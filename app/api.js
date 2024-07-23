const {contextBridge, ipcRenderer} = require('electron');
const axios = require('axios');
const puppeteer = require('puppeteer')
const extra = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
const XLSX = require("xlsx");


contextBridge.exposeInMainWorld('electronAPI', {
    handleClick: (callback) => ipcRenderer.on('button-click', callback),
    sendClick: () => ipcRenderer.send('button-click'),
    crawling: () => crawling(),
    excel: () => excel(),
    someValue: 'Hello from preload'
});


const $ = document.querySelector.bind(document)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

extra.use(StealthPlugin());
extra.use(AdblockerPlugin());

let datas = []

const crawling = async () => {
    datas = []

    const keyword = $("#keyword").value
    const sort = $('#category1').value
    const paging = $('#paging').value

    if (!keyword) {
        alert('검색어를 입력 해주세요.')
        return
    }
    if (!paging) {
        alert('페이지수를 입력 해주세요')
        return
    }


    let count = 0
    $('tbody').innerHTML = ''
    $('#terminal').innerHTML = ''
    addCommand('페이지 접속중...')
    disableButton($('#crawlButton'))
    $('#excelButton').classList.add('hidden')
    for (let p = 1; p <= paging; p++) {
        const browser = await puppeteer.launch({
            headless: 'new',
            defaultViewport: {
                width: 0,
                height: 0
            },
            protocolTimeout: 620000000,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        })
        const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36';

        const page = await browser.newPage()
        page.setUserAgent(ua);


        let url = 'https://www.coupang.com/np/search'
        url = new URL(url)
        const params = new URLSearchParams(url.search)
        params.append('page', p)
        params.append('q', keyword)
        params.append('sorter', sort)
        url.search = params.toString()
        url = url.toString()
        console.log(keyword, sort, p, url)


        addCommand(`${p}번째 페이지 크롤링 진행중...`)
        await page.goto(url, {waitUntil: 'networkidle2'})
        // await page.waitForSelector('#productList li.search-product:not(.search-product__ad-badge) .search-product-wrap-img')
        await delay(1000)

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
        for (let i = 0; i < names.length; i++) {
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

            let rate = ''
            if (rates[i]) {
                rate = rates[i].replace('(', '').replace(')', '')
            } else if(!rates[i]) {
                rate = '리뷰 없음'
            }

            td4.textContent = rate
            td5.textContent = count + 1
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
            tr.appendChild(td5)
            tbody.appendChild(tr)
            count++

            const data = {
                이미지: images[i],
                상품이름: names[i].trimStart(),
                가격: prices[i],
                리뷰수: rate,
                노출순위: count
            }
            datas.push(data)

            // addCommand(`${rank}개 수집 완료`)
        }
        addCommand(`${p}번째 페이지 ${names.length}개 수집 완료 하였습니다.`)
        await page.close()
        await browser.close()
    }
    addCommand(`총 ${count}개 크롤링이 완료 되었습니다.`)
    ableButton($('#crawlButton'))
    $('#excelButton').classList.remove('hidden')
}

const addCommand = (commandExec = 'test') => {
    const p = document.createElement('p')
    const time = document.createElement('span')
    const command = document.createElement('span')
    let now = new Date();
    now = new Date(now.getTime() + 9 * 60 * 60 * 1000)
    now = now.toISOString().slice(0, 19).replace('T', ' ') + ' - ';
    const terminal = $('#terminal')
    p.classList = 'whitespace-pre-line'
    time.textContent = now
    command.textContent = commandExec
    p.appendChild(time)
    p.appendChild(command)
    terminal.appendChild(p)
}

const excel = () => {
    if(!datas.length === 0) alert('추출할 데이터가 없습니다.')
    const worksheet = XLSX.utils.json_to_sheet(datas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    XLSX.writeFile(workbook, '결과.xlsx');
    alert('엑셀 추출이 완료 되었습니다.')
}

const disableButton = (button) => {
    button.textContent = '크롤링 진행중...'
    button.disabled = true
    button.style.opacity = 0.8
    button.style.cursor = 'not-allowed'
}

const ableButton = (button) => {
    button.textContent = '크롤링 시작'
    button.disabled = false
    button.style.opacity = 1
    button.style.cursor = 'pointer'
}


window.onload = () => {
}