const assert = require("assert");
const { get } = require("http");

const loopFibonacci = function (n) {
  if (n <= 1) return n;
  const arr = [0, 1];
  for (let i = 2; i <= n; i++) {
    arr[i] = arr[i - 2] + arr[i - 1]; // arr.push(arr[i-2]+arr[i-1]) 가능
  }
  return arr[n];
};
assert.equal(loopFibonacci(5), 5); //맞는지 확인. 코테의 점검란 같은느낌
assert.equal(loopFibonacci(7), 13); //맞는지 확인. 코테의 점검란 같은느낌
assert.equal(loopFibonacci(30), 832040); //맞는지 확인. 코테의 점검란 같은느낌
console.log(loopFibonacci(5));

console.log("------------");

function recurFibonacci(n) {
  if (n <= 1) return n;
  return recurFibonacci(n - 1) + recurFibonacci(n - 2);
}
console.log(recurFibonacci(7));

console.log("------------");

function memoized(fn) {
  const cache = {};
  return function (k) {
    return cache[k] ?? (cache[k] = fn(k));
  };
}

const memoFibonacci = memoized(function (k) {
  //closure 사용
  if (k <= 1) return k;
  return memoFibonacci(k - 2) + memoFibonacci(k - 1);
});
console.log(memoFibonacci(5));
console.log(memoFibonacci(7));
console.log(memoFibonacci(30));

//코드 검정 코드
function runFn(fn) {
  console.time(fn.name);
  for (let i = 10; i < 100; i += 10) {
    fn(i);
  }
  console.timeEnd(fn.name);
}
runFn(loopFibonacci);
runFn(memoFibonacci);

// 객체 (age는 존재하지 않음 get set 의 this.() 여기에 넣어줄 key 값을 작성해주는거임)
const user = { id: 1, name: "hHoneg" };
Object.defineProperty(user, "age", {
  get() {
    return this.x;
  },
  set(age) {
    this.x = age;
  },
});

const n = 9.23;
// 정수를 다루는 약간 alias 같은걸 정의해준거임 => 프로토타입을 바꿔보는거, 추가하는거임
Object.defineProperty(Number.prototype, {
  length: {
    get() {
      return this.toString().length;
    },
  },
  point: {
    get() {
      const plen =
        this.toString().length - Math.trunc(this).toString().length - 1;
      return +(this % 1).toFixed(plen);
    },
    set(val) {
      this = +this.toFixed(val);
    }
  },
});

Number.prototype.setPoint = function(val) {
  return Number(this.toFixed(val))
} 