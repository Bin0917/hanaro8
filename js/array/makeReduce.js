const assert = require("assert");
const arr = [1, 2, 3, 4];
assert.deepStrictEqual(deleteArray(arr, 2), [1, 2]);
// 2부터 끝까지 지우고 나머지 리턴
assert.deepStrictEqual(deleteArray(arr, 1, 3), [1, 4]); // 1부터 3까지 지우고 나머지 리턴
assert.deepStrictEqual(arr, [1, 2, 3, 4]);
const Hong = { id: 1, name: "Hong" };
const Kim = { id: 2, name: "Kim" };
const Lee = { id: 3, name: "Lee" };
const users = [Hong, Kim, Lee];

// console.log(
//   "user>>",
//   users.filter((u) => typeof u == "function")
// );
// Object.defineProperties(users, "addUser", {
//   enumerable: false,
// });
// Object.defineProperties(users, "removeUser", {
//   enumerable: false,
// });

console.log(
  "user>>",
  Object.keys(users)
    .filter(isNaN)
    .forEach((fname) =>
      Object.defineProperties(users, fname, { enumarable: false })
    )
);

users.addUser = function (newer) {
  // 배열 인스턴스에 메서드를 직접 추가. 이렇게도 해도 되나바
  return [...this, newer];
};

users.removeUser = function (toDel) {
  return this.filter(({ id }) => id != toDel.id);
};

users.changeUser = function (from, to) {
  return this.map((a) => (a.id == from ? to : a));
};

assert.deepStrictEqual(deleteArray(users, 2), [Hong, Kim]);
assert.deepStrictEqual(deleteArray(users, 1, 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, "id", 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, "name", "Lee"), [Hong, Kim]);

// 이건 뭔지 모르겟음 ㄷㄷ 챗지랑 같이보기
