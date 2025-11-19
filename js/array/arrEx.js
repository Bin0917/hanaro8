//순수함수로 작성
const assert = require("assert");

function push(array, ...args) {
  return [array, args].flat(Infinity); // [...array, ...args]
}

function pop(array, num = 1) {
  let ret = array.slice(array.length - num, array.length); // array.slice(-num);
  if (num != 1) {
    return ret;
  }
  return ret[0];
}
//const pop = (arr, num = 2) => {return num == 1 ? array.at(-1) : array.slice(-num)};

function unshift(array, ...args) {
  return [args, array].flat(Infinity);
}

// const shift = (array, cnt = 1) => [, array.slice(0, num), array,slice(cnt)];

function shift(array, num = 1) {
  let ret = array.slice(0, num);
  let ret2 = array.slice(num);
  return [ret, ret2];
}

const arr = [1, 2, 3, 4];
assert.deepStrictEqual(push(arr, 5, 6), [1, 2, 3, 4, 5, 6]);
assert.deepStrictEqual(pop(arr), 4);
assert.deepStrictEqual(pop(arr, 2), [3, 4]); // 2개 팝!

assert.deepStrictEqual(unshift(arr, 0), [0, 1, 2, 3, 4]);
assert.deepStrictEqual(unshift(arr, 7, 8), [7, 8, 1, 2, 3, 4]);
assert.deepStrictEqual(shift(arr), [[1], [2, 3, 4]]); // [shift되는 원소들, 남은 원소들]
assert.deepStrictEqual(shift(arr, 2), [
  [1, 2],
  [3, 4],
]); // 2개 shift
assert.deepStrictEqual(arr, [1, 2, 3, 4]);

//clear
