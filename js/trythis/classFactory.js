// 생성자함수
class Man {
  constructor() {
    console.log("*********");
  }
}

// const m1 = Man();
const m2 = new Man();

//팩토리함수
function createUser(id, name) {
  return {
    id,
    name,
    getUserInfo() {
      return `${this.id}, ${this.name}`;
    },
  };
}
const lee = createUser(1, "lee");
console.log(lee.getUserInfo());
const park = createUser(2, "park");
