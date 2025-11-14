console.log("hello");

let a = 1;
let b = 2;
let c = (a++, b++);
console.log("🚀 ~ c:", c, a, b);

// 91~70 ; A 81~90:b 71~80:c 나머지 : d
const score = 90;

// switch 내부 case에 조건걸려면 true 사용??
switch (true) {
  case score >= 90:
    console.log("A학점");
    break;
  case score >= 80:
    console.log("B학점");
    break;
  case score >= 70:
    console.log("C학점");
    break;
  default:
    console.log("D학점");
}
