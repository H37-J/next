const seq = new Map();

// 개발
let lang;
let page;
let steps;
let lists;
let prev;
let next;
let current_index = 0;

//step1
let hibricksButton;
let ebricksButton;
let busButton;
let starshipButton;

//step2
let iptAgree1;
let iptAgree2;
let iptAgree3;
let check1;
let check2;

let agrTerms;
let agrPrivacy;
let agrCustom;


// error
let nameMessage;

let emailMessage;

let passwordMessage;
let phoneMessage;
let birthMessage;

let certMessage;
let countryMessage;

//step3 kor
let name;

let email;
let id;
let emailAddress;
let emailSelect;
let checkEmail = true;

let password;
let emailButton;

let birthday;
let jumin;
let juminVal;

let iptChk;
let role = 'S'; //S:학생, T:교/강사, I:기관, P:학부모, E:기타
let orgType;

let birth;
let sexType;
let age;

let isMinor = 'N'
let isMinorCert = 'N'

let phone;
let phoneCertButton;
let timer;
let time;
let certNumber;
let certCheckButton;
let certResendButton;

let isMobileCert = 'N'
let smsTimer;

let layer;
let addressButton;
let address;
let address1;
let address2;
let postCode;
let purpose;

let childBday;
let institution;
let institutionPhone;

// step3 eng
let firstName;
let lastName;
let country;

const element_layer = document.getElementById('layer');

const langCheck = async (_this) => {
    lang = _this.getAttribute('lang');
    document.querySelector('#pop').remove();
    if (lang === 'ko') {
        document.querySelector('[aria-kor]').style.display = '';
    } else if (lang === 'en') {
        document.querySelector('[aria-eng]').style.display = '';
    }
    render();
    await eventListener();
}

const render = () => {
    //common
    steps = document.querySelectorAll('[aria-step]');
    lists = document.querySelectorAll('[aria-list]');
    prev = document.querySelectorAll('.prev');
    next = document.querySelectorAll('.next');

    //step1
    hibricksButton = document.querySelector('#hibricks_button');
    ebricksButton = document.querySelector('#ebricks_button');
    busButton = document.querySelector('#bus_button');
    starshipButton = document.querySelector('#starship_button');

    //error
    nameMessage = document.querySelector('#name_message');
    emailMessage = document.querySelector('#email_message');
    passwordMessage = document.querySelector('#password_message');

    passwordMessage = document.querySelector('#password_message');
    birthMessage = document.querySelector('#birth_message');
    phoneMessage = document.querySelector('#phone_message');
    certMessage = document.querySelector('#cert_message');

    //step2
    iptAgree1 = document.querySelector('#iptAgree1');
    iptAgree2 = document.querySelector('#iptAgree2');
    iptAgree3 = document.querySelector('#iptAgree3');
    check1 = document.querySelector('#check1');
    check2 = document.querySelector('#check2');
    //step3
    if (lang === 'ko') {
        name = document.querySelector('#name');
    } else if (lang === 'en') {
        firstName = document.querySelector('#firstName');
        lastName = document.querySelector('#lastName');
        country = document.querySelector('#country');
        countryMessage = document.querySelector('#country_message');
    }

    iptChk = document.getElementsByName('iptChk');

    id = document.querySelector('#id');
    emailAddress = document.querySelector('#email_address');
    emailSelect = document.querySelector('#email_select');
    emailButton = document.querySelector('#email_duplicate_check');
    password = document.querySelector('#password');
    birthday = document.querySelector('#birthday');
    jumin = document.querySelector('#jumin');
    phone = document.querySelector('#phone');
    layer = document.querySelector('#layer');
    addressButton = document.querySelector('#address_button');
    address1 = document.querySelector('#address1');
    address2 = document.querySelector('#address2');
    postCode = document.querySelector('#postcode');
    purpose = document.querySelector('#purpose');
    childBday = document.querySelector('#childBday');
    institution = document.querySelector('#institution');
    institutionPhone = document.querySelector('#institution_phone');

    smsTimer = document.querySelector('#sms_timer');
    phoneCertButton = document.querySelector('#phone_cert_button');
    certNumber = document.querySelector('#cert_number');
    certCheckButton = document.querySelector('#cert_check_button');
    certResendButton = document.querySelector('#cert_resend_button');
}

const eventListener = async () => {
    if (page === 'change') {
        hibricksButton.addEventListener('click', (_this) => {
            _this.preventDefault();
            hibricksCheck();
        })


        ebricksButton.addEventListener('click', (_this) => {
            _this.preventDefault();
            ebricksCheck();
        })

        busButton.addEventListener('click', (_this) => {
            _this.preventDefault();
            busCheck();
        })

        starshipButton.addEventListener('click', (_this) => {
            _this.preventDefault();
            starshipCheck();
        })
    }

    [...prev].map((p) => {
        p.addEventListener('click', (_this) => {
            _this.preventDefault();
            prevStep();
        })
    });

    [...next].map((n) => {
        n.addEventListener('click', (_this) => {
            _this.preventDefault();
            nextStep();
        })
    })

    jumin.addEventListener('keyup', () => {
        genderCheck();
    })

    birthday.addEventListener('keyup', () => {
        birthCheck();
    })

    emailButton.addEventListener('click', (_this) => {
        _this.preventDefault();
        emailCheck();
    });

    [...iptChk].map((i) => {
        i.addEventListener('change', () => {
            roleRender();
        })
    })

    phoneCertButton.addEventListener('click', (_this) => {
        _this.preventDefault();
        send_sms();
    })

    certCheckButton.addEventListener('click', (_this) => {
        _this.preventDefault();
        cert_sms();
    })

    addressButton.addEventListener('click', (_this) => {
        _this.preventDefault();
        find_postcode();
    })

}

const prevStep = () => {
    current_index -= 1;
    stepRender(current_index, 'prev');
}

const nextStep = async () => {
    if (current_index === 0 && page === 'sign') {
        if (stepTwoCheck() === false) {
            return;
        }
    }

    if (current_index === 1 && page === 'sign' && lang === 'ko') {
        const res = await korStepThreeCheck();
        const data = res.body;
        if (data.msg !== '통합회원가입 완료') {
            return;
        }
    }


    if (current_index === 1 && page === 'change') {
        if (stepTwoCheck() === false) {
            return;
        }
    }

    if (current_index === 2 && page === 'change' && lang === 'ko') {
        const res = await korStepThreeCheck();
        const data = res.body;
        if (data.msg !== '통합회원전환 완료') {
            return;
        }
    }

    if (current_index === 2 && page === 'change' && lang === 'en') {
        if (engStepThreeCheck() === false) {
            return;
        }
    }


    current_index += 1;

    stepRender(current_index, 'next');
}

const stepRender = (current_index, fun) => {
    [...steps].map((step, index) => {
        step.style.display = 'none';
        if (index === current_index) {
            step.style.display = 'block';
        }
    });


    if (fun === 'prev') {
        [...lists].map((list, index) => {
            if (index === current_index + 1) {
                list.classList.remove('active');
            }
        })
    } else {
        [...lists].map((list, index) => {
            if (index === current_index) {
                list.classList.add('active');
            }
        })
    }

}

//step1
const hibricks_api = async () => {
    let data;
    const webId = document.querySelector("#hibricks_id").value;
    const webPw = document.querySelector("#hibricks_pw").value;
    const user = {
        webId, webPw,
    };

    try {
        const res = await axios.post(hibricksLoginCheckUrl, user);
        data = {
            status: 200, body: res.data, id: webId,
        };
    } catch (err) {
        data = {
            status: 500, body: err.message,
        };
    }


    return data;
};

const hibricksCheck = async () => {
    const res = await hibricks_api();
    const data = res.body;
    const id = res.id;
    const id_error = document.querySelector("#hibricks_id_error");
    const pw_error = document.querySelector("#hibricks_pw_error");
    const server_error = document.querySelector("#hibricks_server_error");
    const message = document.querySelector("#hibricks_message");
    const card = document.querySelector("#hibricks_card");
    const com_card = document.querySelector("#hibricks_complete_card");
    const showId = document.querySelector("#hibricks_showId");
    const strong = document.createElement("strong");
    const idSpan = document.createElement("span");
    strong.textContent = "ID ";


    if (res.status === 500) {
        hide(id_error);
        hide(pw_error);
        show(server_error);
    } else {
        if (data.code === 0) { // id error
            hide(pw_error);
            hide(server_error);
            show(id_error);
        } else if (data.code === 1) { // password error
            hide(id_error);
            hide(server_error);
            show(pw_error);
        } else if (data.code === 2) { // login success
            hide(id_error);
            hide(pw_error);
            hide(server_error);
            hide(card);
            show(com_card);

            idSpan.textContent = id;
            showId.appendChild(strong);
            showId.appendChild(idSpan);
            message.textContent = data.message;
            seq.set('hiSeq', data.seq);
        }
    }
};

const ebricks_api = async () => {
    let data;
    const id = document.querySelector("#ebricks_id").value;
    const pwd = document.querySelector("#ebricks_pw").value;
    const user = {
        id, pwd,
    };

    try {
        const res = await axios.post(ebricksLoginCheckUrl, user);
        data = {
            status: 200, body: res.data, id: id,
        };
    } catch (err) {
        data = {
            status: 500, body: err.message,
        };
    }

    return data;
};

const ebricksCheck = async () => {
    const res = await ebricks_api();
    const data = res.body;
    const id = res.id;
    const id_error = document.querySelector("#ebricks_id_error");
    const pw_error = document.querySelector("#ebricks_pw_error");
    const server_error = document.querySelector("#ebricks_server_error");
    const message = document.querySelector("#ebricks_message");
    const card = document.querySelector("#ebricks_card");
    const com_card = document.querySelector("#ebricks_complete_card");
    const showId = document.querySelector("#ebricks_showId");
    const strong = document.createElement("strong");
    const idSpan = document.createElement("span");
    strong.textContent = "ID ";


    if (res.status === 500) {
        hide(id_error);
        hide(pw_error);
        show(server_error);
    } else {
        if (data.code === 0) { // id error
            hide(pw_error);
            hide(server_error);
            show(id_error);
        } else if (data.code === 1) { // password error
            hide(id_error);
            hide(server_error);
            show(pw_error);
        } else if (data.code === 2) { // login success
            hide(id_error);
            hide(pw_error);
            hide(server_error);
            hide(card);
            show(com_card);

            idSpan.textContent = id;
            showId.appendChild(strong);
            showId.appendChild(idSpan);
            message.textContent = data.message;
            seq.set('eSeq', data.seq)
        }
    }
};

const starship_api = async () => {
    let data;
    const id = document.querySelector("#starship_id").value;
    const pwd = document.querySelector("#starship_password").value;
    const user = {
        id, pwd,
    };


    try {
        const res = await axios.post(englishStarshipLoginCheckUrl, user);
        data = {
            status: 200, body: res.data, id: id,
        };
    } catch (err) {
        data = {
            status: 500, body: err.message,
        };
    }

    console.log(data)


    return data;
};

const starshipCheck = async () => {
    const res = await starship_api();
    const data = res.body;
    const id = res.id;
    const id_error = document.querySelector("#starship_id_error");
    const pw_error = document.querySelector("#starship_pw_error");
    const server_error = document.querySelector("#starship_server_error");
    const message = document.querySelector("#starship_message");
    const card = document.querySelector("#starship_card");
    const com_card = document.querySelector("#starship_complete_card");
    const showId = document.querySelector("#starship_showId");
    const strong = document.createElement("strong");
    const idSpan = document.createElement("span");
    strong.textContent = "ID ";


    if (res.status === 500) {
        hide(id_error);
        hide(pw_error);
        show(server_error);
    } else {
        if (data.code === 0) { // id error
            hide(pw_error);
            hide(server_error);
            show(id_error);
        } else if (data.code === 1) { // password error
            hide(id_error);
            hide(server_error);
            show(pw_error);
        } else if (data.code === 2) { // login success
            hide(id_error);
            hide(pw_error);
            hide(server_error);
            hide(card);
            show(com_card);

            idSpan.textContent = id;
            showId.appendChild(strong);
            showId.appendChild(idSpan);
            message.textContent = data.msg;
            seq.set('starSeq', data.seq)
        }
    }
};

const bus_api = async () => {
    let data;
    const id = document.querySelector("#bus_id").value;
    const pwd = document.querySelector("#bus_password").value;
    const user = {
        id, pwd,
    };



    try {
        const res = await axios.post(englishBusLoginCheckUrl, user);
        data = {
            status: 200, body: res.data, id: id,
        };
    } catch (err) {
        data = {
            status: 500, body: err.message,
        };
    }

    console.log(data)


    return data;
};

const busCheck = async () => {
    const res = await bus_api();
    const data = res.body;
    const id = res.id;
    const id_error = document.querySelector("#bus_id_error");
    const pw_error = document.querySelector("#bus_pw_error");
    const server_error = document.querySelector("#bus_server_error");
    const message = document.querySelector("#bus_message");
    const card = document.querySelector("#bus_card");
    const com_card = document.querySelector("#bus_complete_card");
    const showId = document.querySelector("#bus_showId");
    const strong = document.createElement("strong");
    const idSpan = document.createElement("span");
    strong.textContent = "ID ";


    if (res.status === 500) {
        hide(id_error);
        hide(pw_error);
        show(server_error);
    } else {
        if (data.code === 0) { // id error
            hide(pw_error);
            hide(server_error);
            show(id_error);
        } else if (data.code === 1) { // password error
            hide(id_error);
            hide(server_error);
            show(pw_error);
        } else if (data.code === 2) { // login success
            hide(id_error);
            hide(pw_error);
            hide(server_error);
            hide(card);
            show(com_card);

            idSpan.textContent = id;
            showId.appendChild(strong);
            showId.appendChild(idSpan);
            message.textContent = data.msg;
            seq.set('busSeq', data.seq)
        }
    }
};

// step2
const stepTwoCheck = () => {
    if (iptAgree1.checked === false) {
        check1.style.display = '';
        agrTerms = 'N';
    } else {
        check1.style.display = 'none';
        agrTerms = 'Y';
    }
    if (iptAgree2.checked === false) {
        check2.style.display = '';
        agrPrivacy = 'N';
    } else {
        check2.style.display = 'none';
        agrPrivacy = 'Y';
    }

    if (iptAgree3.checked) {
        agrCustom = 'Y';
    } else {
        agrCustom = 'N';
    }

    return iptAgree1.checked && iptAgree2.checked;
}


// step3
const changeApi = async (obj) => {
    let data;

    try {
        const res = await axios.post(changeUrl, obj);
        data = {
            status: 200, body: res.data
        };
    } catch (err) {
        data = {
            status: 500, body: err.message,
        };
    }
    return data
}

const signApi = async (obj) => {
    let data

    try {
        const res = await axios.post(signUrl, obj);
        data = {
            status: 200, body: res.data
        };
    } catch (err) {
        data = {
            status: 500, body: err.message,
        };
    }
    return data
}

const korStepThreeCheck = async () => {
    email = emailSelect.textContent === '' ? emailAddress.value === '직접입력' ? id.value + '' : id.value + '@' + emailAddress.value : id.value + '@' + emailSelect.textContent;

    if (korValidateForm() === false) {
        return false;
    }

    if (role === 'T') {
        orgType = document.querySelector('.select-option').textContent;
    } else {
        orgType = '';
    }



    const data = {
        "hiSeq": seq.get('hiSeq')
        , "eSeq": seq.get('eSeq')
        , "busSeq": seq.get('busSeq')
        , "starSeq": seq.get('starSeq')
        , agrTerms
        , agrPrivacy
        , agrCustom
        , "email": email.split('@')[0]
        , "emailAddress": email.split('@')[1]
        , "pwd": password.value
        , "mobile": phone.value
        , "bday": birthday.value
        , "firstName": name.value
        , "ip": '1'
        , lang
        , sexType
        , "memberCode": role
        , orgType
        , isMobileCert
        , isMinor
        , isMinorCert
        , "purpose": purpose.value
        , "childBday": childBday.value
        , "addrRegion": address1.value
        , "addrDet": address2.value
        , "postCode": postCode.value
        , "instName": institution.value
        , "instPhone": institutionPhone.value
    }

    if (page === 'change') {
        return await changeApi(data)
    } else if (page === 'sign') {
        return await signApi(data)
    }
}

const engStepThreeCheck = () => {

    email = emailSelect.textContent === '' ? emailAddress.value === '직접입력' ? id.value + '' : id.value + '@' + emailAddress.value : id.value + '@' + emailSelect.textContent;

    if (engValidateForm() === false) {
        return;
    }

    if (role === 'T') {
        orgType = document.querySelector('#orgType').textContent;
    } else {
        orgType = '';
    }

    const sexType = document.querySelector('#sexType').textContent === 'Gender' ? '' : document.querySelector('#sexType').textContent;
    const country = document.querySelector('#country').textContent;


    const data = {
        "hiSeq": seq.get('hiSeq')
        , "eSeq": seq.get('eSeq')
        , "busSeq": seq.get('busSeq')
        , "starSeq": seq.get('starSeq')
        , agrTerms
        , agrPrivacy
        , agrCustom
        , "name": firstName.value + lastName.value
        , "email": email
        , "pw": password.value
        , "mobile": phone.value
        , "bday": birthday.value
        , lang
        , sexType
        , country
        , "memberCode": role
        , orgType
        , isMobileCert
        , isMinor
        , isMinorCert
        , "purpose": purpose.value
        , "childBday": childBday.value
        , "addrRegion": address1.value
        , "addrDet": address2.value
        , "instNm": institution.value
        , "instPhone": institutionPhone.value
    }

    return false
}

const korValidateForm = () => {
    if (!checkError(charRegex, name, nameMessage, name.value, '이름을 입력 해주세요.', '이름은 문자만 입력 가능합니다.')) {
        return false;
    }

    if (!checkError(emailRegex, id, emailMessage, email, '이메일을 입력 해주세요.', '이메일 형식을 확인 해주세요.')) {
        return false;
    }

    if (!checkError(booleanCheck, id, emailMessage, checkEmail, '이메일을 입력 해주세요', '이메일 중복체크를 확인 해주세요')) {
        return false;
    }

    if (!checkError(passwordRegex, password, passwordMessage, password.value, '비밀번호를 입력 해주세요.', '')) {
        return false;
    }

    if (!checkError(phoneRegex, phone, phoneMessage, phone.value, '핸드폰 번호를 입력 해주세요', '핸드폰 번호를 확인 해주세요')) {
        return false;
    }

    if (!checkError(phoneCheck, phone, phoneMessage, phone.value, '핸드폰 번호를 입력 해주세요', '핸드폰 인증을 완료 해주세요')) {
        return false;
    }


    if (!checkError(birthRegex, birthday, birthMessage, birth, '생년월일을 입력 해주세요', '생년월일을 확인 해주세요')) {
        return false;
    }

    return true
}

const engValidateForm = () => {

    // if (firstName.value === '') {
    //     alert('Please input your first name')
    //     return false
    // }
    //
    // if (lastName.value === '') {
    //     alert('Please input your last name')
    //     return false
    // }
    //
    // if (password.value === '') {
    //     alert('Please input password')
    //     return false
    // }
    //
    // if (country.textContent === 'Select') {
    //     alert('Please input your country')
    //     return false
    // }
    //
    // if (!checkError(emailRegex, email, emailError2)) {
    //     alert('Please check your email')
    //     return false
    // }
    //
    // if (!checkError(charRegex, firstName.value, nameError)) {
    //     alert('Please check your first name')
    //     return false
    // }
    //
    // if (!checkError(charRegex, lastName.value, nameError)) {
    //     alert('Please check your last name')
    //     return false
    // }
    //
    // if (birth !== '' && birth.length !== 8) {
    //     alert('Please check your birthday')
    //     return false
    // }
    //
    // if (phone.value !== '' && !checkError(phoneRegex, phone.value, pho)) {
    //     alert('Please check your phone number')
    //     return false
    // }

    return true
}

// 정규식
const emailRegex = (email) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(email);
}

const birthRegex = (birth) => {
    return birth.length === 8 && parseInt(jumin.value) >= 1 && parseInt(jumin.value) <= 4;
}

const phoneCheck = () => {
    return isMobileCert === 'Y';
}

const passwordRegex = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,16}$/;
    return regex.test(password)
}

const phoneRegex = (phone) => {
    const regex = /^0[0-9]{10,11}$/;
    return regex.test(phone);
}

const charRegex = (val) => {
    const regex = /^[가-힣a-zA-Z]+$/;
    return regex.test(val);
}


const numberRegex = (val) => {
    const regex = /^[0-9]*$/;
    return regex.test(val);
}

const checkError = (regex, element, messageElement, val, validateError, regexError) => {

    if (val === '' || val === undefined) {
        alert(validateError);
        setMessage(messageElement, validateError);
        show(messageElement);
        element.focus();
        return false;
    }

    if (typeof regex !== 'function') {
        hide(messageElement);
        return true;
    }

    if (regex(val) === false) {
        alert(regexError);
        setMessage(messageElement, regexError);
        show(messageElement);
        element.focus();
    } else {
        setMessage(messageElement, '');
        hide(messageElement);
    }

    return regex(val);
}


const show = (element) => {
    element.style.display = '';
}

const hide = (element) => {
    element.style.display = 'none';
}

const setMessage = (element, message) => {
    element.textContent = message;
}


const parentHide = (element) => {
    element.value = '';
    element.parentNode.parentNode.parentNode.style.display = 'none';
}

const parentShow = (element) => {
    element.parentNode.parentNode.parentNode.style.display = '';
}

const roleRender = () => {
    let selectedRole;
    [...iptChk].map(role => {
        if (role.checked === true) {
            selectedRole = role.value;
        }
    })
    role = selectedRole;


    if (role === 'T' || role === 'I') {
        parentShow(institution);
        parentShow(institutionPhone);
        parentHide(childBday);
    } else if (role === 'P') {
        parentShow(childBday);
        parentHide(institution);
        parentHide(institutionPhone);
    } else {
        parentHide(institution);
        parentHide(institutionPhone);
        parentHide(childBday);
    }
}

const emailCheckApi = async (email) => {
    let data;
    const obj = {
        'full_email': email
    }
    try {
        const res = await axios.post(emailCheckUrl, obj);
        data = {
            status: 200, body: res.data
        };
    } catch (err) {
        data = {
            status: 500, body: err.message,
        };
    }
    return data;
}

const booleanCheck = (value) => {
    return value;
}

const emailCheck = async () => {
    email = emailSelect.textContent === '' ? emailAddress.value === '직접입력' ? id.value + '' : id.value + '@' + emailAddress.value : id.value + '@' + emailSelect.textContent;
    if (!checkError(emailRegex, id, emailMessage, email, '이메일을 입력 해주세요.', '이메일 형식을 확인 해주세요.')) {
        return false;
    }

    const res = await emailCheckApi(email);

    show(emailMessage);
    if (res.status === 500) {
        setMessage(emailMessage, '서버에 문제가 있습니다.');
        return false;
    } else if (res.status === 200 && res.body === '0001') {
        setMessage(emailMessage, '이미 있는 이메일 입니다.');
        return false;
    } else if (res.status === 200 && res.body === '0000') {
        setMessage(emailMessage, '사용 가능한 이메일 입니다.');
        checkEmail = true;
    }


    return true;
}

const birthCheck = () => {
    const val = birthday.value;
    const phoneButton = document.querySelector('#phone_button')

    const birthYear = parseInt(val.substring(2, 4));
    const currentYear = new Date().getFullYear();

    if (0 <= birthYear && birthYear <= parseInt(currentYear.toString().substring(2, 4)) && juminVal === 2) {
        age = currentYear - (2000 + birthYear);
    } else {
        age = currentYear - (1900 + birthYear);
    }


    if (age < 14 && val.length === 8) {
        phoneButton.style.display = '';
    } else if (age >= 14 || val.length !== 8) {
        phoneButton.style.display = 'none';
    }
    birth = val;
}

const genderCheck = () => {
    if (jumin.value === '1' || jumin.value === '2') {
        juminVal = 1;
    } else if (jumin.value === '3' || jumin.value === '4') {
        juminVal = 2;
    }

    if (jumin.value === '1' || jumin.value === '3') {
        sexType = 'M';
    } else if (jumin.value === '2' || jumin.value === '4') {
        sexType = 'F';
    }

    birthCheck();
}

const smsSendApi = async () => {
    let data;
    const obj = {
        phone: phone.value
    }

    try {
        const res = await axios.post(smsCheckUrl, obj);
        data = {
            status: 200, body: res.data
        };
    } catch (err) {
        data = {
            status: 500, body: err.message,
        };
    }
    return data;
}

const smsCheckApi = async () => {
    let data;
    const obj = {
        'number': certNumber.value
    }

    try {
        const res = await axios.patch(smsCheckUrl, obj);
        data = {
            status: 200, body: res.data
        };
    } catch (err) {
        data = {
            status: 500, body: err.message,
        };
    }
    return data;
}

const smsDeleteApi = async () => {
    let data;
    const deleteUrl = smsCheckUrl + '/' + phone.value;

    try {
        const res = await axios.delete(deleteUrl);
        data = {
            status: 200, body: res.data
        };
    } catch (err) {
        data = {
            status: 500, body: err.message,
        };
    }
    return data;
}

const send_sms = async () => {
    const res = await smsSendApi();
    const data = res.body


    if (res.status === 500) {
        alert('서버에 문제가 있습니다');
    } else if (res.status === 200 && data.status === '00') {
        alert('인증번호가 전송 되었습니다');
        sms_count();
    } else if (res.status === 200 && data.status === '01') {
        alert('이미 가입된 휴대폰 번호 입니다.');
    }
}

const cert_sms = async () => {
    const res = await smsCheckApi();
    const data = res.body;

    if (res.status === 500) {
        alert('서버에 문제가 있습니다.');
    } else if (res.status === 200) {
        if (data.result_code === '1') {
            alert('인증 되었습니다');

            smsTimer.remove();
            certResendButton.remove();

            certNumber.disabled = true;
            certNumber.textContent = '인증 되었습니다.';
            certNumber.style.paddingLeft = '5px';

            certCheckButton.disabled = true;
            certCheckButton.classList = 'btn-type-1 color-8';

            isMobileCert = 'Y';

            clearSms();
        } else if (data.result_code === '2') {
            alert('인증번호가 틀립니다');
        }
    }


}

const sms_count = () => {
    clearInterval(timer);
    smsTimer.innerHTML = '5:00';
    time = 299;

    hide(phoneCertButton);
    show(smsTimer.parentNode);
    certCheckButton.classList = 'btn-type-1 color-7';
    certNumber.disabled = false;
    timer = setInterval(start_time, 1000);
}

const clearSms = async () => {
    const res = await smsDeleteApi();
    clearInterval(timer);

}

const start_time = () => {
    let m = Math.floor(time / 60);
    let s = (time % 60);
    if (s < 10) s = '0' + s;
    smsTimer.innerHTML = m + ":" + s;


    time--;
    if (time < -1) {
        alert('유효시간이 초과 되었습니다');
        show(phoneCertButton);
        hide(smsTimer.parentNode);
        smsTimer.innerHTML = '5:00';
        certNumber.value = '';
        certNumber.disabled = true;
        certCheckButton.classList = 'btn-type-1 color-8';

        clearSms();

    }
}

const find_postcode = () => {

    const currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

    new daum.Postcode({
        oncomplete: function (data) {
            address1.value = data.address;
            postCode.value = data.zonecode;//우편번호

            element_layer.style.display = 'none';

        },
        width: '100%',
        height: '100%',
        maxSuggestItems: 5
    }).embed(layer);


    layer.style.display = 'block';

    initLayerPosition();
}
const initLayerPosition = () => {
    const width = 500;
    const height = 500;
    const borderWidth = 1;

    layer.style.width = width + 'px';
    layer.style.height = height + 'px';
    layer.style.border = borderWidth + 'px solid';
    layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width) / 2 - borderWidth) + 'px';
    layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height) / 2 - borderWidth) + 'px';
}


// step4
const signComplete = () => {

}

// 아이디 찾기
const findIdApi = async () => {
    const firstName = document.querySelector('#firstName').value
    const emailOrMobile = document.querySelector('#emailOrMobile').value
    const resultId = document.querySelector('#result_id')
    const find = document.querySelector('[aria-find]')
    const result = document.querySelector('[aria-result]')

    const obj = {
        "firstName": firstName
        , "lang": 'ko'
        , "emailOrMobile": emailOrMobile
    }

    try {
        const res = await axios.post(findIdUrl, obj);
        data = {
            status: 200, body: res.data
        };
    } catch (err) {
        data = {
            status: 500, body: err.message,
        };
    }

    if (data.body.msg === '아이디 찾기 완료') {
        find.remove()
        result.style.display = ''
        const email = data.body.map.email
        resultId.textContent = emailMasking(email)

    } else if (data.status === 500) {
        alert('서버에 문제가 있습니다.')
    } else if (data.status === 200 && data.body.msg !== '아이디 찾기 완료') {
        alert('입력하신 정보가 올바르지 않습니다.')
    }

    return data
}

// 비밀번호 찾기 이메일 전송
const findPasswordApi = async () => {
    let data
    const email = document.querySelector('#email').value

    const obj = {
        email
    }

    const checkUrl = findPasswordUrl + '?email=' + email

    try {
        const res = await axios.get(checkUrl);
        data = {
            status: 200, body: res.data
        };
    } catch (err) {
        data = {
            status: 500, body: err.message,
        };
    }


    if (data.body.msg === '아이디 확인 완료') {
        try {
            const res = await axios.post(checkUrl, obj);
            data = {
                status: 200, body: res.data
            };
        } catch (err) {
            data = {
                status: 500, body: err.message,
            };
        }

        if(data.body.msg === '이메일 전송 완료') {
            alert('입력하신 이메일로 비밀번호 변경 메일이 전송 되었습니다.')
        }

    } else if (data.status === 500) {
        alert('서버에 문제가 있습니다.')
    } else if (data.status === 200 && data.body.msg !== '아이디 확인 완료') {
        alert('입력하신 이메일이 올바르지 않습니다.')
    }

    return data
}

const modifyPasswordApi = async () => {
    let data
    const pwd = document.querySelector('#password').value
    const pwdCheck = document.querySelector('#passwordCheck').value

    if(passwordRegex(pwd) === false) {
        alert('6~16자의 영문, 숫자, 특수문자(~!@#$%^&*) 조합을 입력해 주세요.')
        return
    }

    if(pwd !== pwdCheck) {
        alert('비밀번호가 일치하지 않습니다')
        return
    }

    const obj = {
        pwd
    }


    try {
        const res = await axios.patch(modifyPasswordUrl, obj);
        data = {
            status: 200, body: res.data
        };
    } catch (err) {
        data = {
            status: 500, body: err.message,
        };
    }


    const msg = data.body.msg

    if(msg === '비밀번호변경 완료') {
        alert('비밀번호가 변경 되었습니다.')
    }



    return data
}

const checkNull = (str) => {
    return typeof str === "undefined" || str == null || str === "";
}

const emailMasking = (str) => {
    let originStr = str;
    let emailStr = originStr.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    let strLength;

    if (checkNull(originStr) === true || checkNull(emailStr) === true) {
        return originStr;
    } else {
        strLength = emailStr.toString().split('@')[0].length - 8;

    }
    return originStr.toString().replace(new RegExp('.(?=.{0,' + strLength + '}@)', 'g'), '*');
}

window.onload = () => {
    if (document.querySelector('#page')) {
        page = document.querySelector('#page').value;
    }

}


//번호 인증 체크 넣기
//postcode 넣기
// 멤버 세이브 값 맞추기