var x = 1;

function f1(a, b) {
  console.log(x, this.y); //static : 1, dynamic: 2
  //[[OuterEnv]]
  function f1_inner() {
    //[[OuterEnv]] : f1을 가르킴
  }
}

// globalThis.z...

function f2() {
  var x = 2;
  console.log(x, new.target);
  this.y = 999;
  const bf1 = f1.bind({ y: 100 }); // 이하 다 동일한거임
  bf1(1, 2);
  f1.call({ y: 1000 }, 1, 2);
  f1.apply({ y: 1000 }, [1, 2]); // 얘는 뒤에 인자 1개밖에 못씀
}

globalThis.z = 400;
let cnt = 0;
const f3 = function () {
  cnt++;
};
f2();
console.log("--------");
