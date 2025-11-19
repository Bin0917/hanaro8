const assert = require("assert");

const makeArr = (s, e, step) => {
  //배열리턴해야함
  let arr = [];
  // if (step > 0) {
  //     while
  //     return arr;
  // } else {
  //     for (let i = s; i )
  // }
  while (s != e) {
    arr.push(s);
    s += step;
  }
  arr.push(s);
  return arr;
};

const range = (s, e, step = 1) => {
  let status = (s, e) => (s > e ? -1 : 1);
  if (step === 0 || s === e) {
    return [s];
  }
  if (e == undefined) {
    if (s > 0) {
      e = s;
      s = 1;
      step *= status;
      return makeArr(s, e, step);
    } else {
      e = -1;
      step *= status;
      return makeArr(s, e, step);
    }
  }
  if ((s > e && step > 0) || (s < e && step < 0)) {
    return [];
  }
  console.log(step);
  return makeArr(s, e, step);
};

assert.deepStrictEqual(range(1, 10, 1), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.deepStrictEqual(range(1, 10, 2), [1, 3, 5, 7, 9]);
assert.deepStrictEqual(range(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.deepStrictEqual(range(10, 1), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);

// assert.deepStrictEqual(range(5, 5, 0), [5]);
// assert.deepStrictEqual(range(1, 5, 0), [1]);
// assert.deepStrictEqual(range(5, 5, -1), [5]);
// assert.deepStrictEqual(range(5, 5), [5]);
// assert.deepStrictEqual(range(0, 0, 5), [0]);
// assert.deepStrictEqual(range(1, 5, -1), []);

// assert.deepStrictEqual(range(1, 5, 6), [1]);
// assert.deepStrictEqual(range(0, 5), [0, 1, 2, 3, 4, 5]);
// assert.deepStrictEqual(range(-3, 0), [-3, -2, -1, 0]);

// assert.deepStrictEqual(range(5, 1, 1), []);
// assert.deepStrictEqual(range(0, -1), [0, -1]);
// assert.deepStrictEqual(range(0, -3), [0, -1, -2, -3]);
// assert.deepStrictEqual(range(5, 1), [5, 4, 3, 2, 1]);
// assert.deepStrictEqual(range(10, 1, -2), [10, 8, 6, 4, 2]);

// assert.deepStrictEqual(range(5), [1, 2, 3, 4, 5]);
// assert.deepStrictEqual(range(0), [0]);
// assert.deepStrictEqual(range(0, 0), [0]);
// assert.deepStrictEqual(range(2, 1, -5), [2]);
// assert.deepStrictEqual(range(0, -1, -5), [0]);
// assert.deepStrictEqual(range(-5), [-5, -4, -3, -2, -1]);
// assert.deepStrictEqual(
//   range(50),
//   Array.from({ length: 50 }, (_, i) => i + 1)
// );
// assert.deepStrictEqual(
//   range(1, 150, 3),
//   Array.from({ length: 50 }, (_, i) => i * 3 + 1)
// );
