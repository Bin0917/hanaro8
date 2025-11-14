setImmediate(() => console.log("setImmediate11", new Date()));
setTimeout(() => console.log("setTimeout11", new Date()), 0);
process.nextTick(() => console.log("nextTick11"));

// i/o polling : i/o 모듈 내에선 poll 에서 시작이니까 immediate 가 먼저 실행. 위처럼 코드로 나열하면 setTimeout이 큐 젤 위에 잇으니깐 먼저실행
const fs = require("fs"); // CJS
fs.readFile("prac.js", (result) => {
  console.log("---------------");
  setTimeout(() => {
    console.log("setTimeout22");
  });
  setImmediate(() => {
    console.log("setImmediate22");
  });
  process.nextTick(() => console.log("nextTick22")); //얘가 가장 우선적으로 실행
});

// const f3 = () => (x) => x ** 2;
// function f33() {
//   return function (x) {
//     return x ** 2;
//   };
// }

// const f33 = () => {}; // function f3() {}
// const f44 = (x) => x ** 2; // function f44(x) {return x**2;}
// const f5 = () => fx; //function f5() {return fx;}
