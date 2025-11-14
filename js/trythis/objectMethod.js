const assert = require("assert");

const kim = { nid: 3, nm: "Kim", addr: "Pusan" };
const newKim1 = shallowCopy(kim);
newKim1.nid = 5;
newKim1.addr.city = "Seoul";
assert.notEqual(kim.nid, newKim1.nid);
assert.strictEqual(kim.nm, newKim1.nm);
function shallowCopy(obj) {
  //   return Object.entries(obj);
  //   return { ...obj };
  // return Object.assign({}, obj);
  const ret = {};
  for (const [k, v] of Object.entries(obj)) {
    // key, value 그대로 준검
    ret[k] = v;
  }
  return ret;
}

// 2) 이하 deep copy
const kim2 = {
  nid: 3,
  nm: "Kim",
  addr: { city: "Pusan", road: "Haeundaero", zip: null }, // 프로퍼티 값에 객체가잇으니 딥카피?
};
const newKim2 = deepCopy(kim2);
newKim2.addr.city = "Daegu";
assert.notEqual(kim.addr.city, newKim2.addr.city);

function deepCopy(obj) {
  if (obj == null || typeof obj !== "object") return obj;
  const ret = {};
  for (const [k, v] of Object.entries(obj)) {
    ret[k] = deepCopy(v); //쉘로우랑 다 똑같은데, 객체인 프로퍼티를 재귀로 파고 들어가서 하나하나 따주는게 딮카피...
  }
  return ret;
}

return;
//1번
const arr = [100, 200, 300, 400, 500, 600, 700];

// for-in 은 객체접근. 그래서 k를 가져오면 배열에 숨어있는 0,1... key 값이 들어옴. value 가져오려면 배열처럼 접근해서 가져오면 ㅗ딤 ㅇㅇ
for (const k in arr) {
  console.log(k, arr[k]); // 배열의 밸류는 객체처럼 접근하면 됨
}

// 2번
const obj = { name: "Kim", addr: "Yongsan", level: 1, role: 9, receive: false };
for (const k in obj) {
  console.log(k, ":", obj[k]); // 객체도 배열처럼 접근해서 가져오기
}
for (const val of Object.values(obj)) {
  // in : 프로퍼티 키, of : value를 가져옴 !!!!!!!!!!!!!!!!!!
  console.log(val);
}

Object.defineProperties(obj, "level", { enumarable: false });
for (const [k, v] of Object.entries) {
  console.log(k, ":", v);
}

data = [
  ["A", 10, 20],
  ["B", 30, 40],
  ["C", 50, 60, 70],
];
function makeObjectFromArray(arr) {
  const ret = {};
  for (const [k, ...v] of arr) {
    ret[k] = v;
  }
  return ret;
}
const newObj = makeObjectFromArray(data);

function makeArrayFromObject(obj) {
  const arr = [];
  for (const [k, v] of Object.entries(obj)) {
    arr.push([k, ...v]);
  }
  return arr;
}
