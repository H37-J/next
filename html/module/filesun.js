import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
        width: 1200,
        height: 1440,
    },
    protocolTimeout: 620000000,
    args: ['--disable-infobars'] // 비밀번호 저장 알림창 비활성화
});

const page = await browser.newPage()
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

page.on('dialog', async dialog => {
    const dialogType = dialog.type()
    await delay(2000)
    if (dialogType === 'confirm' || dialogType === 'alert') {
        await dialog.accept();
    }
});

await page.goto('https://www.filesun.com/')
await page.type('#outloginS1Id', 'these9907')
await page.type('#outloginS1Pw', 'star8903!@')
await page.keyboard.press('Enter')

await page.waitForNavigation()


for(let i = 1; i <= 100; i ++) {
    let time = 0;
    if(i === 1) {
        await delay(1000)
    } else {
        await delay(330000)
    }
    console.log(`${i}번째 실행`)
    await page.goto('https://www.filesun.com/disk/my_upload_list')
    await page.click('#myUploadListF1 > table > tbody > tr:nth-child(1) > td.check > input')
    await page.click('#myUploadListPage > div.topBtnPart > div.myupload_btn > a')
}
