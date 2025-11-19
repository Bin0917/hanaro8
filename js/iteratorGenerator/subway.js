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

  //시작, 끝 인덱스 정하기
  *[Symbol.iterator]() {
    let startIdx = LINE2.indexOf(this.#start);
    let endIdx = LINE2.indexOf(this.#end);

    while (startIdx !== endIdx) {
      // 배열 길이 초과시 첫번째로 턴백
      if (startIdx >= LINE2.length) {
        startIdx = 0;
      }

      yield LINE2[startIdx++]; // 시작인덱스 넣고 증가
    }
    yield LINE2[endIdx]; // 마지막값 전달
  }
}

const routes = new Subway("문래", "신림");
console.log([...routes]);
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
