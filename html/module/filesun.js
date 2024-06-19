import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
        width: 3000,
        height: 2500,
    },
    args: [
        "--disable-notifications"
    ]
});

const page = await browser.newPage()

page.on('dialog', async dialog => {
    const dialogType = dialog.type(); // 알림창 유형 (alert, beforeunload, confirm, prompt)
    console.log(dialogType)
    if (dialogType === 'beforeunload') {
        // 페이지 나가기 전 알림창일 경우
        await dialog.accept(); // 알림창 확인(OK) 클릭
    } else if (dialogType === 'prompt') {
        // 비밀번호 관리자 알림창일 경우
        await dialog.dismiss(); // 알림창 취소 클릭
    }
});

await page.goto('https://www.filesun.com/')
await page.type('#outloginS1Id', 'these9907')
await page.type('#outloginS1Pw', 'star8903!@')
await page.click('#leftLogin > form > fieldset > div.inputGroup > input')

await page.waitForNavigation()



// await page.goto('https://www.filesun.com/disk/my_upload_list?page=3')
//
//
//
// await page.click('#myUploadListF1 > table > tbody > tr:nth-child(1) > td.check > input')
// await page.click('#myUploadListPage > div.topBtnPart > div.myupload_btn > a')
// await page.keyboard.press('Enter')
