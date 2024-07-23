const fs = require('fs');
const XlsxTemplate = require('xlsx-template');

// 템플릿 파일 읽기
fs.readFile('test.xlsx', (err, data) => {
    if (err) throw err;

    // XlsxTemplate 객체 생성
    const template = new XlsxTemplate(data);

    // 이미지 링크 준비
    const imageUrl = 'https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/397296000467275-5a83a375-06a6-4c00-9e16-ffd2687b23c8.jpg';

    // 데이터 설정
    const values = {
        myImage: imageUrl
    };

    // 첫 번째 시트에 데이터 적용
    template.substitute(1, values);

    // 결과 파일 생성
    const result = template.generate();
    fs.writeFileSync('output.xlsx', result, 'binary');
});