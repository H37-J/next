import puppeteer from "puppeteer";
import {exec, spawn} from 'child_process'
const {translate} = await import('@william5553/translate-google-api')
import readline from 'readline'

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

async function translateText(text, sourceLang, targetLang) {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.responseData.translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        return null;
    }
}

// 사용 예


let count = 1;
// 23118
for(let i = 22885; i >= 1; i--) {
    await page.setDefaultNavigationTimeout(0);
    const url = `https://www.92mj4.com/points-12-${i}-1.html`
    await page.goto(url)

    await delay(5000)

    const result = await page.evaluate(() => {
        return {
            title: document.title,
            url: window.location.href,
            src: videoObject.video,
        };
    });
    let element = await page.$('#top > div.videobox > div > div.f-l.video-player > div.player-foot > div.tags-views > div > a');
    let title = await element.evaluate(el => el.innerHTML)
    const data = await translate(title, {
        to: 'ko'
    });
    title = data.text.replaceAll(' ','').replaceAll('(','').replaceAll(')','')+'펨돔femdom'
    console.log(title)

    const src = result.src.split('?')[0]
    element = await page.$('#top > div.videobox > div > div.f-l.video-player > div.player-foot > div.player-foot-group > span');
    const allTime = await element.evaluate(el => el.innerHTML.split('时长：')[1])
    const text = parseInt(await element.evaluate(el => el.innerHTML.split('时长：')[1][0]))
    let length

    if(text > 0) {
        length = text + 1
    } else {
        length = 7
    }

    const command = `sh down3.sh ${src} ${length} ${i} ${title}`
    console.log(command, `${count}번째 다운 시작`)
    await down(command, count)
    await gif(title, '00:10:00', i, length)
    count++
    console.log('last index:' + i)
    await delay(1000)
}



async function down(command, i){
    return new Promise((resolve, reject) => {
        try {
            const child = exec(command, { stdio: 'pipe' });
            child.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });

            child.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });

            child.on('close', (code) => {
                console.log(`영상 다운로드 완료: ${i}`);
                resolve()
            });
        } catch (error) {
            console.error('오류:', error);
        }
    })
}

function timeToSeconds (timeString) {
    if(timeString.split(':').length === 3) {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    } else {
        const [minutes, seconds] = timeString.split(':').map(Number);
        return minutes * 60 + seconds;
    }

}


function secondsToTime (seconds)  {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return [hours, minutes, remainingSeconds]
        .map(v => v.toString().padStart(2, '0'))
        .join(':');
}


async function gif(title, allTime, dir, count) {
    console.log(title, allTime, dir, count)
    let interval = timeToSeconds(allTime) / 4
    let time = interval
    const arr = []

    console.log(interval)
    for(let i = 0; i < 5; i++) {
        arr.push(secondsToTime(time))
        time += interval
    }

    console.log(arr)

    for(let k = 1; k < count; k++) {

        for (let i = 0; i < 3; i++) {

            try {
                const command = `cd ${title} && ffmpeg -ss ${arr[i]} -t 00:00:03 -i ${k}.mp4 -vf "fps=10,scale=320:-1:flags=lanczos" -c:v gif ${k}_${i}.gif`
                console.log(command)
                const child = exec(command, {stdio: 'pipe'});
                child.stdout.on('data', (data) => {
                    console.log(`stdout: ${data}`);
                });

                child.stderr.on('data', (data) => {
                    console.error(`stderr: ${data}`);
                });

                child.on('close', (code) => {
                    console.log(`이미지 추출 완료: ${k}`);
                });
            } catch (error) {
                console.error('오류:', error);
            }
        }
    }


}
