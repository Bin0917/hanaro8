const users = [
  { id: 1, name: "Hong" },
  { id: 20, name: "Kim" },
  { id: 3, name: "Lee" },
];

console.log(users.reduce((acc, user) => `${acc} ${user.name}`, "").trim());
console.log(users.map((user) => user.name).join(" "));
const objs = [{ id: 1 }, { name: "hone" }, { addr: "seoul", id: 5 }];

console.log(objs.reduce((acc, obj) => ({ ...acc, ...obj }), {}));
console.log(objs.reduce((acc, obj) => Object.assign(acc, obj), {}));
