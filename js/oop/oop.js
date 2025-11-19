class emp {
  constructor(name) {
    // this.setFullname(name); // 생성자에서 바로 박아도 되는군!
    this.fullname = name; // 프로퍼티화 가능
  }

  // 'kilong hong'
  set fullname(name) {
    [this.firstName, this.lastName] = name.split(" ");
  }
  get fullname() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const hong = new emp("Kildong Hong");
// console.log(hong.getFullname());
hong.setFullname = "Nanda kim";
console.log(hong.fullname);

console.log(Object.getOwnPropertyDescriptor(emp.prototype, "fullname"));
