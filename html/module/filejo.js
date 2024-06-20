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
        await page.reload()
    }
});

await page.goto('https://extra.filejo.com/')
await page.click('body > div.top_info > div > ul > li:nth-child(1) > a')
await page.type('#mb_id', 'star2098');
await page.type('#mb_pw', 'star8903');
await page.click('body > div.main_loginbox > ul > div.layerLogin > ul.login_inputbox > li:nth-child(4) > input\n');

await page.waitForNavigation()

await delay(3000)
await page.click('body > div.top_info > div > ul > li:nth-child(1) > a')
await page.click('body > div.top_info > div > ul > div.myinfo_popup.myInfoLayer > ul.myinfo_box > input.mypage_btn')

await delay(3000)
await page.click('body > div.main_wrap > div.main_list2 > ul.mytop_tab > li:nth-child(2) > a');

await delay(3000)
await page.click('#sellerContentsMenu')

await delay(3000)
for(let i = 1; i <= 100; i ++) {
    let time = 0;
    if (i === 1) {
        await delay(1000)
    } else {
        await delay(610000)
    }
    console.log(`${i}번째 실행`)
    await page.click('#mypageInfoArea > ul.list006 > li:nth-child(2) > div.ttl001 > input')
    await page.click('#mypageInfoArea > ul.mypminibar > ul.minibar02 > li:nth-child(3) > input[type=button]')

}