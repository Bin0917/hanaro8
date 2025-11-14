// function getWeekName() {
//     const date = arguments[0];
//     console.log("🚀 ~ getWeekName ~ date:", date)
// }
function getWeekName(date) {
  //   if (date === undefined) date = new Date();
  date = date ?? new Date();
  let weekName;
  switch (date.getDay()) {
    case 0:
      weekName = "일";
      break;
    case 1:
      weekName = "월";
      break;
    case 2:
      weekName = "화";
      break;

    case 3:
      weekName = "수";
      break;

    case 4:
      weekName = "목";
      break;

    case 5:
      weekName = "금";
      break;

    case 6:
      weekName = "토";
      break;
  }
  console.log(`오늘은 ${date}요일 입니다`);
}

// const today = new Date();
// const WEEK_NAMES = "일월화수목금토";
// console.log(`오늘은 ${WEEK_NAMES[today.getDay()]}요일 입니다.`);
// // 문자열 인덱스기반 값 뽑기 : 배열맹키로 [] 안에 인덱스 때리면 됨다. or charAt 쓰셈 ㄱ

getWeekName();
getWeekName(new Date());

const WEEKNAMES = "일월화수목금토";
// function getWeekName(date) {
//   const weekName = WEEKNAMES[(date ?? new Date()).getDay()];
//   console.log(`오늘은 ${weekName}요일 입니다`);
// }

const getWN = (date) => WEEKNAMES[(date ?? new Date()).getDay()];
console.log(getWN(new Date()));
