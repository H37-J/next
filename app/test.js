// 현재 시간 가져오기
const currentDate = new Date();

// 9시간을 밀리초로 변환 (9 * 60 * 60 * 1000)
const NINE_HOURS = 9 * 60 * 60 * 1000;

// 9시간 추가
const newDate = new Date(currentDate.getTime() + NINE_HOURS);

console.log(newDate);