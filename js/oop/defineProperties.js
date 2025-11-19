class Emp {}
Object.defineProperties(Animal.prototype, {
  upperName: {
    get() {
      return this.name.toUpperCase();
    },
  },
});

Emp.prototype.nameLength = function () {
  //새 함수 정의
  return this.fullName.length;
};
jake.__proto__ = Pet.prototype;
// Bad! 이제 jake는 Dog의 본성을 잃음!!
jake.feed("dog-food"); // OK!
jake.bark(); // But, this is not a Function!
const petMixin = {
  likesPeople() {
    console.log(`${this.name} like…`);
  },
};
Object.assign(jake, petMixin); // jake만!
Object.assign(Dog.prototype, petMixin);
// 모든 개들에게 likesPeople() 부여
// cf. Mixin Function (trait)
//  class Dog extends mixin(Animal, ...)
//  ex) jake에게 Pet 클래스의 feed를 Mixin하려면??
class Pet {
  feed(nutrient) {
    console.log(`${this.name}`, nutrient);
  }
}
Object.assign(Emp.prototype, { feed: Pet.prototype.feed });
hong.feed();
