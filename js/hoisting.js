var x;
function f() {}
let y; // unInitialized 아래 let y 만나기 전까지. 만나면 사라짐
//--------------- 메모리선언부

x = 1;
f();
y = 9; //==> var y = 9;
// let y; 그래서 let은 선후관계 중ㅇ함
