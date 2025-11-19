const assert = require("assert");
const { isDeepStrictEqual } = require("util");
const keyPair__2 = (arr, sum) => {
  // const myPairIdx = {};
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] == sum) {
        return [i, j];
      }
    }
  }
};
const keyPair = (arr, sum) => {
  const myPairIdx = {}; // 얘를 캐시로 씀
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    const pairIdx = myPairIdx[val];
    if (pairIdx) return [pairIdx, i];
    myPairIdx[sum - val] = i;
  }
}; // = 해석해보자

assert.deepStrictEqual(keyPair([1, 3, 4, 5], 7), [1, 2]);
assert.deepStrictEqual(keyPair([1, 4, 45, 6, 10, 8], 16), [3, 4]);
assert.deepStrictEqual(keyPair([1, 2, 4, 3, 6], 10), [2, 4]);
const x = keyPair([1, 2, 3, 4, 5, 7], 9);
assert.ok(isDeepStrictEqual(x, [3, 4]) || isDeepStrictEqual(x, [1, 5]));
keyPair([1, 3, 4, 5], 7); // [1, 2]
keyPair([1, 4, 45, 6, 10, 8], 16); // [3, 4]
keyPair([1, 2, 4, 3, 6], 10); // [2, 4]
keyPair([1, 2, 3, 4, 5, 7], 9); // [3, 4]  or [1, 5]
//cf. O(n^2) ⇒ ⇒ ⇒ O(N) || O(logN)
