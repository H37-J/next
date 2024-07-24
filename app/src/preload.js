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
    coupangCrawling: () => coupangCrawling(),
    naveCrawaling: () => naveCrawaling(),
    getContent: () => getContent(),
    excel: () => excel(),
});

const $ = document.querySelector.bind(document)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

extra.use(StealthPlugin());
extra.use(AdblockerPlugin());

let page
let datas = []
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36';

const createElement = (dom) => {
    return document.createElement(dom)
}

const addContent = (parent, data, dom = createElement('td')) => {
    dom.classList = 'px-6 py-4'
    if(data) dom.textContent = data
    parent.appendChild(dom)
}

const getContent = async () => {
    if(!page) {
        addCommand('브라우저를 접속해 크롤링 할 페이지를 열어주세요.')
        return false
    }
    const tbody = $('tbody')
    const terminal = $('#terminal')
    const paging = $('#paging').value
    const excelButton = $('#excelButton')
    tbody.innerHTML = ''
    terminal.innerHTML = ''
    excelButton.classList.add('hidden')
    datas = []
    let main = await page.$('#cafe_main')
    let frame = await main.contentFrame()
    const a = await frame.$('div.prev-next a')
    if(!a) {
        addCommand('페이지가 유효하지 않습니다.')
        return false
    }
    let link = await a.evaluate(el => el.href)

    let count = 1
    for(let p = 1; p <= paging; p++) {
        if(p !== 1) {
            link = link.replace(`search.page=${p - 1}`, `search.page=${p}`)
        }
        await page.goto(link)

        let main = await page.$('#cafe_main')
        let frame = await main.contentFrame()

        const div = await frame.$$('div.article-board')
        const list = await div[1].$('table')

        const titles = await list.$$eval('tbody tr td div.board-list a.article', elements => {
            return elements.map(element => element.textContent)
        })
        // const links = await list.$$eval('tbody tr td div.board-list a.article', elements => {
        //     return elements.map(element => element.href)
        // })
        const users = await list.$$eval('tbody tr td.td_name a', elements => {
            return elements.map(element => element.textContent)
        })
        const times = await list.$$eval('tbody tr td.td_date', elements => {
            return elements.map(element => element.textContent)
        })
        const views = await list.$$eval('tbody tr td.td_view', elements => {
            return elements.map(element => element.textContent)
        })
        for (let i = 0; i < titles.length; i++) {
            const tr = createElement('tr')
            addContent(tr, count)
            addContent(tr, titles[i])
            addContent(tr, users[i])
            addContent(tr, times[i])
            addContent(tr, views[i])
            addContent(tbody, false, tr)

            const data = {
                No: count++,
                제목: titles[i].trimStart(),
                작성자: users[i],
                작성일: times[i],
                조회: views[i]
            }
            datas.push(data)
        }
        addCommand(`${p}페이지 크롤링 완료 되었습니다.`)
    }
    excelButton.classList.remove('hidden')
}

//네이버 카페 크롤링
const naveCrawaling = async () => {
    datas = []
    const url = 'https://cafe.naver.com/joonggonara'

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 1340,
            height: 1600
        },
        protocolTimeout: 620000000,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    page = await browser.newPage()
    await page.goto('https://cafe.naver.com/joonggonara')
}

//쿠팡 크롤링
const coupangCrawling = async () => {
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

        const page = await browser.newPage()
        page.setUserAgent(userAgent);

        let url = 'https://www.coupang.com/np/search'
        url = new URL(url)
        const params = new URLSearchParams(url.search)
        params.append('page', p)
        params.append('q', keyword)
        params.append('sorter', sort)
        url.search = params.toString()
        url = url.toString()


        addCommand(`${p}번째 페이지 크롤링 진행중...`)
        await page.goto(url, {waitUntil: 'networkidle2'})
        // await page.waitForSelector('#productList li.search-product:not(.search-product__ad-badge) .search-product-wrap-img')


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
            } else if (!rates[i]) {
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
    if (!datas.length === 0) alert('추출할 데이터가 없습니다.')
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



