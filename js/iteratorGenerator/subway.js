const assert = require("assert");
const LINE2 = [
  "신도림",
  "성수",
  "신설동",
  "용두",
  "신답",
  "용답",
  "시청",
  "충정로",
  "아현",
  "이대",
  "신촌",
  "공항철도",
  "홍대입구",
  "합정",
  "당산",
  "영등포구청",
  "문래",
  "대림",
  "구로디지털단지",
  "신대방",
  "신림",
  "봉천",
  "서울대입구",
  "낙성대",
  "사당",
  "방배",
  "서초",
  "교대",
  "강남",
  "역삼",
  "선릉",
  "삼성",
  "종합운동장",
  "신천",
  "잠실",
  "잠실나루",
  "강변",
  "구의",
  "건대입구",
  "뚝섬",
  "한양대",
  "왕십리",
  "상왕십리",
  "신당",
  "동대문역사문화공원",
  "을지로4가",
  "을지로3가",
  "을지로입구",
];
// 이터레이터로 작성하기 위해선 클래스 내부에 *[Symbol.iterator]() 작성 필요
class Subway {
  // 은닉성 지키기
  #start;
  #end;
  // 시작, 끝값 받아줌.
  constructor(start, end) {
    this.#start = start;
    this.#end = end;
  }

  *[Symbol.iterator]() {
    //시작, 끝 인덱스 정하기
    let startIdx = LINE2.indexOf(this.#start); // 지금은 이터레이터 돌때마다 계속 두개를 갱신함
    let endIdx = LINE2.indexOf(this.#end); // 현재인덱스로 하나로만 짜기

    while (startIdx !== endIdx) {
      // 배열 길이 초과시 첫번째로 턴백
      if (startIdx >= LINE2.length) startIdx = 0;

      yield LINE2[startIdx++]; // 시작인덱스 넣고 증가하면서 값 던지기
    }
    yield LINE2[endIdx]; // 마지막값 전달
  }
}

const routes = new Subway("문래", "신림"); // iterator 프로토콜로 인해 ... 쓰면 자동으로 next 호출함 ㅇ
console.log([...routes]); //밖에서 yield로 보낸 값 저장. 내부에선 저장되지 않음 ㅇㅇ
assert.deepStrictEqual(
  [...routes],
  ["문래", "대림", "구로디지털단지", "신대방", "신림"]
);

const it1 = routes[Symbol.iterator]();
["문래", "대림", "구로디지털단지", "신대방", "신림"].forEach((value, i) => {
  assert.deepStrictEqual(it1.next(), { value, done: false });
  console.log(i, routes.toString());
});
// console.log(it1.next());
assert.deepStrictEqual(it1.next(), { value: undefined, done: true });

const route3 = new Subway("문래", "합정"); // 46개 정거장이면 통과!
assert.strictEqual([...route3].length, 46);
const route4 = new Subway("신도림", "을지로입구"); // 48개 정거장이면 통과!
assert.strictEqual([...route4].length, 48);
return;

// => 이하 assert는 toString, iterator 함수를 추가해야함

// const routes1 = new Subway("문래", "신림");
// console.log([...routes1]);
// assert.deepStrictEqual(
//   [...routes1],
//   ["문래", "대림", "구로디지털단지", "신대방", "신림"]
// );

// const it1 = routes1.iterator();
// ["문래", "대림", "구로디지털단지", "신대방", "신림"].forEach((value, i) => {
//   assert.deepStrictEqual(it1.next(), { value, done: false });
//   console.log(i, routes1.toString());
// });
// assert.deepStrictEqual(it1.next(), { value: undefined, done: true });

// const routes2 = new Subway("구로디지털단지", "성수"); // 32개 정거장
// routes2.iterator().next();
// assert.strictEqual(
//   routes2.toString(),
//   "구로디지털단지역에서 성수역까지 가는 열차이며, 현재 신대방역입니다"
// );
// console.log([...routes2]); // ['신대방', ..., '성수']
// const it2 = routes2[Symbol.iterator]();
// while (true) {
//   const x = it2.next();
//   console.log(x);
//   if (x.done) break;
// }

// const route3 = new Subway("문래", "합정"); // 46개 정거장이면 통과!
// assert.strictEqual([...route3].length, 46);
// const route4 = new Subway("신도림", "을지로입구"); // 48개 정거장이면 통과!
// assert.strictEqual([...route4].length, 48);
