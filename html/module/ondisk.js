import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
        width: 1200,
        height: 1440,
    },
    protocolTimeout: 620000000,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const page = await browser.newPage()
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

page.on('dialog', async dialog => {
    const dialogType = dialog.type()
    await delay(2000)
    if (dialogType === 'confirm' || dialogType === 'alert') {
        await dialog.accept();
        await page.reload()
    }
});

await page.goto('https://www.ondisk.co.kr/index.php')
// await page.click('#footer_appVersion > div > a:nth-child(3)')
// await delay(3000)
// await page.goto('https://www.ondisk.co.kr/index.php')
await delay(3000)
await page.type('#mb_id', 'these9902');
await page.type('#page-login > form > fieldset > div > p.ctrl.ctrl-pw > input', 'star8903');
await page.click('#page-login > form > fieldset > div > p.btn-login > input[type=image]');

await page.waitForNavigation()

await delay(2000)
await page.goto('https://ondisk.co.kr/index.php?mode=my_page&sm=regist&orderis=purchase_cnt&sort=DESC&code_cate=all&code=all&sch_state=&list_max=20&p=3')

await delay(2000)
await page.click('#mypage_myinfo > table > tbody > tr:nth-child(3) > td:nth-child(1) > input[type=checkbox]')
await page.click('#mypage_myinfo > form > div > p.right > a:nth-child(2) > img')


for(let i = 1; i <= 100; i ++) {
    let time = 0;
    if (i === 1) {
        await delay(1000)
    } else {
        await delay(1810000)
    }
    console.log(`${i}번째 실행`)
    await page.click('#mypage_myinfo > table > tbody > tr:nth-child(3) > td:nth-child(1) > input[type=checkbox]')
    await page.click('#mypage_myinfo > form > div > p.right > a:nth-child(2) > img')


}