// async function translateText(text, sourceLang, targetLang) {
//     const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
//
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         return data.responseData.translatedText;
//     } catch (error) {
//         console.error('Translation error:', error);
//         return null;
//     }
// }
//
// // 사용 예
// const data = await translateText('『chnnsct1818』真实体育课后重度原味虐女m', 'zh', 'ko')
//
// console.log(data)

const {translate} = await import('@william5553/translate-google-api')
const result = await translate('『chnnsct1818』教训学校里抢对象的女生（剧情）', {
    to: 'ko'
});

console.log(result.text.trim())