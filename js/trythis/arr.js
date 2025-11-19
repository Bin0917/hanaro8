const hong = { id: 1, name: "Hong" };
const kim = { id: 2, name: "Kim" };
const lee = { id: 3, name: "Lee" };
const park = { id: 4, name: "Park" };
const users = [hong, kim, lee, park];
const find3 = (a) => a.id === 3;
const idxId2 = users.findIndex(find3);
// Try this: id를부여해서실행하는findId 함수를작성하시오.
const findIdx = (pid) => () => users.find((user) => user.id == pid);
// const us
// const findId = (pid) => (user) => user.id == pid;
const findId =
  (pid) =>
  ({ id }) =>
    id == pid;
const idxId11 = users.findLastIndex(findId(1));
console.log(" idxId11:", idxId11);
