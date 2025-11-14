const gate1counter = (function () {
  let cnt = 0;
  return function () {
    return ++cnt;
  };
})(); //IIFE (즉시실행함수)

console.log("🚀 ~ gate1counter:", gate1counter());
console.log("🚀 ~ gate2counter:", gate1counter());
console.log("🚀 ~ gate2counter:", gate1counter());

let data;
(async function af() {
  data = await fetch("https://jsonplaceholder.typicode.com/todos/1").then(
    (res) => res.json()
  );
  return data;
})().then((data) => console.log(data));
// const data = await af();
// console.log(data);

for (let i = 0; i < 10; i++) {
  setTimeout(
    function (n) {
      console.log("ddd", i, n);
    },
    1000,
    i // 이 값이 function의 매개변수 인자로 들어감
  );
}

const intl = setInterval(
  function (n) {
    console.log("ddd", n);
  },
  1000,
  100
);

setTimeout(() => clearInterval(intl), 5000); //clear 하면 중간에 멈출때 돌아가는 함수를 끝냄
