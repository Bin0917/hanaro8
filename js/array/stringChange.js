//ex1) 배열의 각 원소를 String으로 변환하시오.
const assert = require("assert");
const arr = [1, 2, 3, true];
// const ret1 = arr.map(String);
assert.deepStrictEqual(ret1, ["1", "2", "3", "true"]);

//ex2) 다음과 같이 작동하는 classNames 함수를 작성하시오.
const classNames = (...args) =>
  args
    .map((v) => v.trim())
    .filter((v) => !!v /*Boolean 해도 됨*/) //오호 => 반전 두번시키니까 그냥 boolean으로 전환해주는거임 ㅇㅇ '' 공백 등을 falsy로 판단하고 걸러냄 ㅇㅇ
    .join(" ");

const ret2 = classNames("", "a b c", "d", " ", " xyz ", "e");
assert.strictEqual(ret2, "a b c d x y z e");
// 주의: ' a b c d  e'면 안됨!!
//  cf. example in React
//  <div classNames=({x ? 'a b' : ''}, {'' ? 'c' : ''}, {z && 'e f'});
