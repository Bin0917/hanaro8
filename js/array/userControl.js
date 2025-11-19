const hong = { id: 1, name: "Hong" };
const choi = { id: 5, name: "Choi" };
const kim = { id: 2, name: "kim" };
const lee = { id: 3, name: "Lee" };
const park = { id: 4, name: "Park" };
const users = [kim, lee, park]; // 오염되면 안됨!!
users.addUser(hong); // [kim, lee, park, hong]
users.removeUser(lee); // [kim, park]
users.changeUser(kim, choi); // [choi, lee, park]
//(주의) Array.prototype 조작 금지

function addUser(user) {
  return [];
}
