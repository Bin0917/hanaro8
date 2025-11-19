const arr = Array.from({ length: 5 }, (_, i) => i + 1);

const isEven = (n) => n % 2 == 0;

// map (a,i) a:원소값, i:인덱스값
const ev1 = arr.map((_, i) => isEven(i));
// 받는거 주는거 같으면 다 생략하고 함수이름만 씀..
const ev2 = arr.map(isEven); // map 은 원소의 갯수만큼 다 리턴
console.log("🚀 ~ ev1:", ev1);
console.log("🚀 ~ ev2:", ev2);

const onlyEvens = arr.filter(isEven); // filter는 리턴값이 참인 원소들만 새배열로 만들어줌
console.log("🚀 ~ onlyEvens:", onlyEvens); //true false 반환해야함

//중간에 중지 불가 => 기존 for문과 차이점
arr.forEach((a) => console.log(a, isEven(a))); // 리턴값이 없고 걍 루프만 도는거

for (const a of arr) {
  console.log(a, isEven(a));
}

const arr2 = [...arr]; // 다펼침, 새로운 힙에 저장됨. arr1,2는 같지않음(false)
const arr3 = arr2.concat(arr); // 얘도 새로운 힙에 저장됨
const arr4 = [...arr2, ...arr]; // 얘도 concat과 동일!

const a3 = arr.find((a) => a == 3); //arr을 홀수와 짝수로 나누는것 : groupBY
const evenOdds = Object.groupBy(arr, (a) => (isEven(a) ? "even" : "odd"));

const jarr = arr.join(); //매개변수 생략시 ','
console.log("🚀 ~ jarr:", jarr);

// /       시작은 포함, 종료는 그 앞까지 컷
const a = [1, 2, 3, 4, 5, 6, 7];
// let arr2 = a;
a.copyWithin(4, 2 /*, 끝자리도 지정가능*/); // 4자리에(인덱스위치) 2부터(인덱스위치의 값) 끝까지채워주세요

arr2.push("02", "01", "03", "a", "c", "b");
const s1 = arr2.sort(); //sort != 순수함수

arr2 = a;
const s2 = arr2.sort((a, b) => a - b);
console.log("🚀 ~ s2:", s2);
arr2 = a;
const s3 = arr2.sort((a, b) => (a < b ? -1 : 1));
console.log("🚀 ~ s3:", s3);
const s3Des = arr2.sort((a, b) => (a < b ? 1 : -1));
console.log("🚀 ~ s3:", s3Des);

users = [
  { id: 1, name: "Hong" },
  { id: 2, name: "Kim" },
  { id: 3, name: "Lee" },
];

[users[1], users[2]] = [users[2], users[1]];

// const us1 = users.sort((a, b) => a.id - b.id);
const us1 = users.sort(({ id }, { id: id2 }) => id - id2);
console.log(users);

const shallow = arr2.slice();
console.log("🚀 ~ shallow:", shallow);
const shallow2 = [...arr2];
console.log("🚀 ~ shallow2:", shallow2);

const sp1 = arr.splice(1, 3);
console.log("🚀 ~ sp1:", sp1, arr);
arr.splice(1, 0, ...sp1); //0 => 지우는거 없다!
console.log("🚀 ~ arr:", arr);

const sp2 = arr.splice(2);
arr.splice(2, 0, ...sp2);
console.log("🚀 ~ arr:", arr);
