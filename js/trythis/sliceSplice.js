const assert = require("assert");
const arr2 = [1, 2, 3, 4, 5];
// let b = arr2;
// ex1) [2,3]을 추출
const ex1 = arr2.slice(1, 3);
assert.deepStrictEqual(ex1, [2, 3]);

// ex2) [3]부터 모두 다 추출
const ex2 = arr2.slice(2);
assert.deepStrictEqual(ex2, [3, 4, 5]);

// ex3) [2,3,4] 제거하기
const ex3 = arr2.splice(1, 3);
assert.deepStrictEqual(ex3, [2, 3, 4]);
assert.deepStrictEqual(arr2, [1, 5]);

// ex4) 복원하기
const ex4 = arr2.splice(1, 0, ...ex3);
assert.deepStrictEqual(ex4, []);
assert.deepStrictEqual(arr2, [1, 2, 3, 4, 5]);

// ex5) [3] 부터 끝까지 제거하기
const ex5 = arr2.splice(2);
assert.deepStrictEqual(ex5, [3, 4, 5]);
assert.deepStrictEqual(arr2, [1, 2]);

// ex6) 복원하기
const ex6 = arr2.splice(2, 0, ...ex5);
assert.deepStrictEqual(ex6, []);
assert.deepStrictEqual(arr2, [1, 2, 3, 4, 5]);

// ex7) [1,2, 'X', 'Y', 'Z', 4, 5] 만들기
// - 방법1) 3부터 모두 지우고 'X', 'Y', 'Z', 4, 5 추가
const ex7 = arr2.splice(2, 7, ...["X", "Y", "Z", 4, 5]);
assert.deepStrictEqual(arr2, [1, 2, "X", "Y", "Z", 4, 5]);
// ==>  복원
arr2.splice(2, 3, 3);
//arr2.splice(2,Infinity,...ex7); 도 가능
assert.deepStrictEqual(arr2, [1, 2, 3, 4, 5]);

// - 방법2) 3만 지우고 'X', 'Y', 'Z' 추가
const ex7_2 = arr2.splice(2, 1, ...["X", "Y", "Z"]);
assert.deepStrictEqual(arr2, [1, 2, "X", "Y", "Z", 4, 5]);
arr2.splice(2, 3, 3);
assert.deepStrictEqual(arr2, [1, 2, 3, 4, 5]);

// ex8) 위 7번 문제를 splice를 사용하지 말고 작성하시오.
// const ex8 = arr2.slice(0, 2).concat("X", "Y", "Z").concat(arr2.slice(3)); //? 넘 난잡한디
const ex8 = [...arr2.slice(0, 2), "X", "Y", "Z", ...arr2.slice(3)];
assert.deepStrictEqual(ex8, [1, 2, "X", "Y", "Z", 4, 5]);

const ex9 = arr2.toSpliced(2, 1, "X", "Y", "Z"); // 순수함수로 쓰고싶음.. toSliced() 쓰면 됨
assert.deepStrictEqual(ex9, [1, 2, "X", "Y", "Z", 4, 5]);
