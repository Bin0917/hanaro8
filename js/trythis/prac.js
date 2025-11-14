//1번
const a = () => {
  for (let i = 1; i <= 10; i++) console.log(i / 10); //console.log(+i.toFixed(1)) 도 가능(fixed로 문자열 변경된걸 + 를 이용해 숫자로 변경)
};

// 2번
const b = () => {
  for (let i = 1; i <= 10; i++) {
    let sqrtNum = Math.sqrt(i);
    if (sqrtNum % 1 == 0) {
      continue;
    }
    console.log(+sqrtNum.toFixed(3));
  }
};

//3번 on me..
function addPoint(a, b) {
  // . 기준으로 나누기
  let aArr = a.toString().split(".");
  let aLen = aArr[1].length;
  let bArr = b.toString().split(".");
  let bLen = bArr[1].length;
  let fixedNum = Math.max(aLen, bLen);
  let ans = a + b;
  console.log(+ans.toFixed(fixedNum));
  //   let bLen = a.split(".");
}
addPoint(2.333, 2.3333333);

// 3번 강사님
addPoints(0.21354, 0.1); // 0.31354
addPoints(0.14, 0.28); // 0.42
addPoints(0.34, 0.226); // 0.566
addPoints(10.34, 200.226); // 210.566
addPoints(0.143, -10.28); // -10.137
addPoints(0.143, -10); // -9.857

function addPoints(a, b) {
  const alen = pointLength(a);
  const blen = pointLength(b);
  // const ret = alen > blen ? (a + b).toFixed(alen)
  //                         : (a + b).toFixed(blen);
  // const ret = (a + b).toFixed(alen > blen ? alen : blen);
  const ret = (a + b).toFixed(Math.max(alen, blen));
  console.log(a, b, "->", +ret);
}

function pointLength(num) {
  // if (num === undefined || num === null) return 0;
  if (!num) return 0;
  return num.toString().length - Math.trunc(num).toString().length - 1;
}

const N = 10000000;
const prices = [
  10.34232323,
  15,
  "xxx",
  5.67899,
  null,
  20.9,
  1.005121,
  0,
  15.234,
  undefined, // isNaN에서 true 로 잡힘
  0.5,
];
function avg(prices) {
  let cnt = 0;
  let sum = 0;
  for (const price of prices) {
    if (price == null || isNaN(price)) continue;
    sum += price * N * 100; // 바로 나누면 .330000000000 같은 오류 발생
    cnt++;
  }

  const ret = Math.trunc(sum / cnt / N) / 100;
  console.log("🚀 ~ avg ~ ret:", ret);
}
