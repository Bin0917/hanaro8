const assert = require("assert");

const range = (s, e, step = s > e ? -1 : 1) => {
  if (s === e || step == 0) return [s];
  if ((s - e) * step > 0) return [];

  //   if (e == undefined) {
  //     if (s > 0) {
  //       e = s;
  //       s = 1;
  //     } else if (s < 0) {
  //       e = -1;
  //     } else {
  //       // s == 0
  //       return [0];
  //     }
  //   }
  const temps = s; // 신기하다
  e = e ?? (s > 0 ? ((s = 1), temps) : s == 0 ? 0 : -1);

  const arrs = [];
  let i = s;
  //   while (arrs.length < 1000) { // 오호 이런느낌~
  //     // 넉넉하게 걸어놓음
  //     if (s > e && i < e) break; // 5 4 3 2 1
  //     if (s < e && i > e) break; // 1 2 3 4 5
  //     arrs.push(i);
  //     i += step;
  //   }
  for (let i = s; s > e ? i >= e : i <= e; i += step) {
    arrs.push(i);
  } // ㄴ for문 중간 조건

  return arrs;
};

assert.deepStrictEqual(range(1, 10, 1), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.deepStrictEqual(range(1, 10, 2), [1, 3, 5, 7, 9]);
assert.deepStrictEqual(range(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.deepStrictEqual(range(10, 1), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
assert.deepStrictEqual(range(5, 5, 0), [5]);
assert.deepStrictEqual(range(1, 5, 0), [1]);
assert.deepStrictEqual(range(5, 5, -1), [5]);
assert.deepStrictEqual(range(5, 5), [5]);
assert.deepStrictEqual(range(0, 0, 5), [0]);
assert.deepStrictEqual(range(1, 5, -1), []);

assert.deepStrictEqual(range(1, 5, 6), [1]);
assert.deepStrictEqual(range(0, 5), [0, 1, 2, 3, 4, 5]);
assert.deepStrictEqual(range(-3, 0), [-3, -2, -1, 0]);

assert.deepStrictEqual(range(5, 1, 1), []);
assert.deepStrictEqual(range(0, -1), [0, -1]);
assert.deepStrictEqual(range(0, -3), [0, -1, -2, -3]);
assert.deepStrictEqual(range(5, 1), [5, 4, 3, 2, 1]);
assert.deepStrictEqual(range(10, 1, -2), [10, 8, 6, 4, 2]);

assert.deepStrictEqual(range(5), [1, 2, 3, 4, 5]);
assert.deepStrictEqual(range(0), [0]);
assert.deepStrictEqual(range(0, 0), [0]);
assert.deepStrictEqual(range(2, 1, -5), [2]);
assert.deepStrictEqual(range(0, -1, -5), [0]);
assert.deepStrictEqual(range(-5), [-5, -4, -3, -2, -1]);
assert.deepStrictEqual(
  range(50),
  Array.from({ length: 50 }, (_, i) => i + 1)
);
assert.deepStrictEqual(
  range(1, 150, 3),
  Array.from({ length: 50 }, (_, i) => i * 3 + 1)
);
