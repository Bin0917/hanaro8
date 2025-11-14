const memoizedTable = {};
let cnt = 0;
function factorial(n) {
  cnt++;
  if (n == 1) return 1;
  return memoizedTable[n] ?? (memoizedTable[n] = n * factorial(n - 1)); // 값이 있음 출력 없음 이후값 넣어주기
}

console.log(factorial(3), cnt);
cnt = 0;
console.log(factorial(5), cnt);
cnt = 0;
console.log(factorial(10), cnt);

function memoized(fn) {
  const cache = {};
  return function (k) {
    return cache[k] ?? (cache[k] = fn(k));
  };
}
// function factor(k) {
//   return k;
// }
const memoizedFac = memoized(function (k) {
  cnt++;
  if (k == 1) return 1;
  return k * memoizedFac(k - 1);
});

console.log("-------------");
cnt = 0;
console.log(memoizedFac(3), cnt);
cnt = 0;
console.log(memoizedFac(5), cnt);
cnt = 0;
console.log(memoizedFac(10), cnt);
