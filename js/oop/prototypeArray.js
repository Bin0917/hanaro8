const assert = require("assert");

const arr = [1, 2, 3, 4, 5];
const hong = { id: 1, name: "Hing" };
const kim = { id: 2, name: "Kim" };
const lee = { id: 3, name: "Lee" };
const users = [hong, lee, kim];

// 커스텀함수 제작 : object.defineProperty
Object.defineProperty(Array.prototype, "mapBy", {
  value(key) {
    return this.map((obj) => obj[key]);
  },
});
// 여러개 정의할때는 properties
Object.defineProperties(Array.prototype, {
  firstObject: {
    get() {
      return arr[0]; // this[0] 으로!!
    },
  },
  lastObject: {
    get() {
      return arr[arr.length - 1];
    },
  },
  filterBy: {
    value(key, value, isInclude = false) {
      //key의 value에 value 값이 포함되면 name을 가져오기
      return this.filter((obj) => {
        if (isInclude) {
          //value가 문자일때
          if (obj[key].includes(value)) {
            return obj;
          }
        } else {
          // value가 숫자일때
          if (obj[key] === value) {
            return obj;
          }
        }
      });
    },
  },
  rejectBy: {
    value(key, value, isInclude) {
      return this.filter((obj) => {
        if (isInclude) {
          if (!obj[key].includes(value)) {
            return obj;
          }
        } else {
          if (obj[key] !== value) {
            return obj;
          }
        }
      });
    },
  },
  findBy: {
    value(key, value) {
      return this.find((obj) => {
        if (obj[key] === value) {
          return obj;
        }
      });
    },
  },
  sortBy: {
    //여기만 아직 못함 ㅠㅠ
    value(flag) {
      return this.sort((flag) => (flag === `${flag}:desc` ? 1 : -1));
    },
  },
});

assert.deepStrictEqual([arr.firstObject, arr.lastObject], [1, 5]);
assert.deepStrictEqual(users.mapBy("id"), [1, 3, 2]);
assert.deepStrictEqual(users.mapBy("name"), ["Hing", "Lee", "Kim"]);
assert.deepStrictEqual(users.filterBy("id", 2), [kim]);
assert.deepStrictEqual(users.filterBy("name", "i", true), [hong, kim]); // key, value일부, isInclude
assert.deepStrictEqual(users.rejectBy("id", 2), [hong, lee]);
assert.deepStrictEqual(users.rejectBy("name", "i", true), [lee]);
assert.deepStrictEqual(users.findBy("name", "Kim"), kim);
assert.deepStrictEqual(users.sortBy("name:desc"), [lee, kim, hong]);
assert.deepStrictEqual(users.sortBy("name"), [hong, kim, lee]);
return;
assert.deepStrictEqual(users.firstObject, hong);
assert.deepStrictEqual(users.lastObject, lee);
users.firstObject = kim;
assert.deepStrictEqual(users.firstObject, kim);
users.lastObject = hong;
assert.deepStrictEqual(users.lastObject, hong);
