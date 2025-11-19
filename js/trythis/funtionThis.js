//  // ⇔function declareFn(name) {
//  const expressFn = function(name) {
//  // if, 'use strict' ?
//     this.name = name;
//     console.log(this, new.target,this.name, name);
//  };

// const arrowFn = (name) => {
//  this.name = name;
//  console.log(this, new.target,this.name, name);
// };
// //  expressFn('expfn');
// //  arrowFn('afn');
// const dfn = new expressFn('D');
// //  const afn = new arrowFn('A'); // error!

// const Dog = function (name) {
//   console.log(this, new.target, this instanceof Dog);
//   this.name = name;
//   this.bark = function () {
//     console.log("bark=", new.target, this.name, name);
//   };
//   this.bark2 = () => console.log("bark2=", new.target, this.name, name);
// };
// // const dog = Dog("Doggy");
// const lucy = new Dog("Lucy");
// // Dog.bark(); // => 없음. 함수객체로 등록됐을땐 감지못함. 내부 function이 실행되야하는겨
// // lucy.bark(); // ?
// // lucy.bark2(); // 부모의 this.name name은 내가 없으니까 부모의 name.. 객체속에서의 화살표함수는 객체의 뭐심미긱
// // console.log("type=", typeof dog); // Dog 는 function object이나, dog는 함수의 반환값이 없으니까 undefined
// console.log("type=", typeof lucy); // new 로 하면 인스턴스 반환. 이건 힙에 잇는 객체니까 객체값으로 반환됨
