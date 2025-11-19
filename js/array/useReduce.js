const arr = [1, 2, 3, 4, 5];
//arr.map(a => a ** 2).map(a => Math.sqrt(a)).map(a => a ** 3);
// ⇒⇒⇒ 결과 => [ 1, 8, 27, 64, 125 ]
const square = (n) => n ** 2;
const sqrt = (n) => Math.sqrt(n);
const cube = (n) => n ** 3;

const xr1 = arr.map(square).map(sqrt).map(cube);
assert.deepStrictEqual(xr1, [1, 8, 27, 64, 125]);

const xr2 = arr.map((a) =>
  [square, sqrt, cube].reduce((acc, fn) => fn(acc), a)
);
console.log("🚀  xr2:", xr2);
const xr3 = arr.map((a) =>
  [cube, square, sqrt].reduce((acc, fn) => fn(acc), a)
);
console.log("🚀  xr3:", xr3);
const xr4 = arr.map((a) =>
  [square, cube, (n) => n + 1].reduce((acc, fn) => fn(acc), a)
);
console.log("🚀  xr4:", xr4);
// 이건 뭐지 흠..
