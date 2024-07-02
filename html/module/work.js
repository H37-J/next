// hobath0102  SUDABU1107

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

await page.goto('https://www.naver.com/')
// await delay(3000)
// await page.click('#account > div > a')
// await delay(3000)
// await page.type('#id', 'hjk9407');
// await delay(3000)
// await page.type('#pw', 'star8903!@');
// await delay(3000)
// await page.keyboard.press("Enter")
await delay(9000)



let pageNum = 1
await page.goto(`https://section.blog.naver.com/BlogHome.naver?directoryNo=0&currentPage=${pageNum}&groupId=0`)
await delay(2000)
let count = 1
for(let i = 1; i <= 10; i++)
{
    await page.click(`#content > section > div.list_post_article.list_post_article_comments > div:nth-child(${i}) > div > div.info_post > div.desc > a.desc_inner`) // 새로운 탭을 여는 링크 클릭

    await delay(11000)
    const pages = await browser.pages()
    const newPage = pages[2]

    const currentUrl = newPage.url();
    const arr = currentUrl.split('/')
    const num = arr[arr.length - 1]
    console.log(newPage.url())


    const heart = `#area_sympathy${num} > div > a`
    const comment = `#Comi${num}`
    const ment = `#naverComment_201_${num}__write_textarea`
    const button = `#naverComment_201_${num} > div > div.u_cbox_write_wrap.u_cbox_focus > div.u_cbox_write_box.u_cbox_type_logged_in > form > fieldset > div > div > div.u_cbox_upload > button > span.u_cbox_txt_upload`

    const frameHandle = await newPage.$("#mainFrame")
    const frame = await frameHandle.contentFrame();

    await delay(3000)

    if(await frame.$(heart)) {
        frame.click(heart)
    }
    await delay(3000)

    if(await frame.$(comment)) {
        await frame.click(comment)
        await delay(12000)
    }


    const cm = "안녕하세요^^ 정성스러운 글 잘 보고 갑니다!\n" +
        "제 블로그도 한번 방문 해주세요ㅎㅎ 자주 올게요!"

    if(await frame.$(ment)) {
        await frame.type(ment, cm)
    }
    if(await frame.$(button)) {
        await frame.click(button)
    }


    await delay(2000)

    console.log(`${count}개 완료`)
    count++

    newPage.close()
    if(i === 10) {
        console.log('page변경')
        pageNum += 1
        await page.goto(`https://section.blog.naver.com/BlogHome.naver?directoryNo=0&currentPage=${pageNum}&groupId=0`)
        console.log(page.url())
        await delay(4000)
        i = 1
    }
}



// const [newPage] = await Promise.all([
//     new Promise(resolve => browser.once('targetcreated', target => resolve(target.page()))),
//     page.click('#content > section > div.list_post_article.list_post_article_comments > div:nth-child(1) > div > div.info_post > div.desc > a.desc_inner') // 새로운 탭을 여는 링크 클릭
// ]);
//
// await delay(3000)
// const elements = await newPage.$$('*'); // 모든 요소 선택
// for (const element of elements) {
//     const html = await page.evaluate(el => el.outerHTML, element);
//     console.log(html);
// }
//