const axios = require('axios');
const fs = require('fs');
const path = require('path');

// 이미지를 다운로드할 웹 사이트 URL
const websiteUrl = 'https://nextjsconf-pics.vercel.app/p/0';

// 이미지를 저장할 로컬 경로
const savePath = 'images';

// 이미지 다운로드 함수
async function downloadImage(url, filename) {
    const imagePath = path.join(savePath, filename);
    const writer = fs.createWriteStream(imagePath);

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

async function getImagesFromIframe() {
    console.log('start')
    const response = await axios.get(websiteUrl);
    const iframeRegex = /<iframe[^>]+src="([^">]+)/g;
    const iframeMatches = response.data.matchAll(iframeRegex);
    for (const iframeMatch of iframeMatches) {
        const iframeUrl = iframeMatch[1];
        console.log(iframeUrl)
        const iframeResponse = await axios.get(websiteUrl + iframeUrl);
        const imageRegex = /<img[^>]+src="([^">]+)/g;
        const imageMatches = iframeResponse.data.matchAll(imageRegex);

        console.log(iframeResponse.data)
        for (const imageMatch of imageMatches) {
            const imageUrl = imageMatch[1];
            const filename = imageUrl.split('/').pop();
            await downloadImage(imageUrl, filename);
            console.log(`다운로드 완료: ${filename}`);
        }

    }
}

// 웹 페이지에서 이미지 URL 추출
async function getImagesFromWebsite() {
    const response = await axios.get(websiteUrl);
    const regex = /<img[^>]+src="([^">]+)/g;
    const matches = response.data.matchAll(regex);

    for (const match of matches) {
        console.log(matches)
        const imageUrl = match[1];
        const filename = imageUrl.split('/').pop();
        console.log(websiteUrl + imageUrl)
        // await downloadImage(imageUrl, filename);
        // console.log(`다운로드 완료: ${filename}`);
    }
}

// 이미지 다운로드 실행
getImagesFromWebsite().catch(error => {
    console.error('다운로드 에러:', error);
});

