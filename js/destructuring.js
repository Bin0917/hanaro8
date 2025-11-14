//1.
const hong = { id: 1, name: "Hong" };
const lee = { id: 2, name: "Lee" };

function f1(user) {
  const { id, name } = user;
  console.log(id);
  console.log(name);
}
function f2({ id, name }) {
  console.log(id, name);
}

// f1(Lee);
f1({ id });

//2. 맞긴 했다만,, 뭔가뭔가임
const user = { id: 1, name: "Hong", passwd: "xxx", addr: "Seoul" };
const { passwd, ...userInfo } = user;
console.log(userInfo);

// 3. => 또같음
// 그냥 id1으로 받으면 [ { id : 1 } ] 이 그대로 받아짐
// 내부의 id 값을 꺼내려면 괄호 다 벗기고 해야됨
const arr = [[{ id: 1 }], [{ id: 2 }, { id: 3 }]];

const [[{ id: id1 }], [{ id: id2 }, { id: id3 }]] = arr;
console.log(id1, id2, id3);

//+a 순서로 먹어야하니까 배열류로 바꿔줘야하나봐, join으로 배열내 글자 합칙
const user2 = { name: "Hong", passwd: "xyz", addr: "Seoul" };
function getUserValueExceptInitial(k) {
  const { [k]: val } = user2; // user2[k]
  const [, ...rest] = val;
  return rest.join("");
}
console.log(getUserValueExceptInitial("name")); // 'ong'
console.log(getUserValueExceptInitial("passwd")); // 'yz'
console.log(getUserValueExceptInitial("addr")); // 'eoul'

//+aa 스왑
const a = [1, 2];

[ar[0], ar[1]] = [ar[1], ar[0]];

console.log(ar);
