const phoneRegex = (phone) => {
    const regex = /^0[0-9]{10,11}$/;
    return regex.test(phone);
}

const isAlpha = str => /^[a-zA-Z]*$/.test(str)
const isAlphaNumeric = str => /^[a-z0-9]+$/gi.test(str);

const capitalizeEveryWord = str =>
    str.replace(/\b[a-z]/g, char => char.toUpperCase());


const isEmailValid = address => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address);

const dateRegex = str => /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(str)

console.log(dateRegex('32/12/1994'))
