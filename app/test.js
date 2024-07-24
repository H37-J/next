const puppeteer = require("puppeteer");
const naveCrawaling = async () => {
    datas = []
    const url = 'https://cafe.naver.com/joonggonara'

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 1440,
            height: 1200
        },
        protocolTimeout: 620000000,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()
    await page.goto('https://cafe.naver.com/joonggonara')
    const element = await page.$('table')
    console.log(element)

}

naveCrawaling()