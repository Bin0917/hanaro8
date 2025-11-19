const assert = require("assert");
const arr = [1, 2, 3, 4, 5];
const hong = { id: 1, name: "Hing" };
const kim = { id: 2, name: "Kim" };
const lee = { id: 3, name: "Lee" };
const users = [hong, lee, kim];

Object.defineProperties(Array.prototype, {
  firstObject: {
    get() {
      return this[0];
    },
    set(val) {
      this[0] = val;
    },
  },
  lastObject: {
    get() {
      return this[this.length - 1];
    },
    set(val) {
      this[this.length - 1] = val;
    },
  },
});

// 이렇게 지정해줘도 되는군!!!!!
Array.prototype.mapBy = function (prop) {
  return this.map((a) => a[prop]);
};

Array.prototype.filterBy = function (k, v, isInclude = false) {
  const cb = isInclude ? (a) => a[k].includes(v) : (a) => a[k] === v;

  return this.filter(cb);
};

Array.prototype.rejectBy = function (k, v, isInclude = false) {
  const cb = isInclude ? !((a) => a[k].includes(v)) : (a) => a[k] !== v;

  return this.filter(cb);
};

Array.prototype.findBy = function (prop, value) {
  return this.find((v) => v[prop] === value);
};
//요기복습
Array.prototype.sortBy = function (prop_dir) {
  const [prop, order = "asc"] = prop_dir.split(":");
  const dir = order === asc ? 1 : -1;
  return this.sort((a, b) => (a[prop] > b[prop] ? -dir : -dir));
};

assert.deepStrictEqual([arr.firstObject, arr.lastObject], [1, 5]);
assert.deepStrictEqual(users.mapBy("id"), [1, 3, 2]);
assert.deepStrictEqual(users.mapBy("name"), ["Hing", "Lee", "Kim"]);
assert.deepStrictEqual(users.filterBy("id", 2), [kim]);
assert.deepStrictEqual(users.filterBy("name", "i", true), [hong, kim]); // key, value일부, isInclude
assert.deepStrictEqual(users.rejectBy("id", 2), [hong, lee]);
assert.deepStrictEqual(users.rejectBy("name", "i", true), [lee]);
assert.deepStrictEqual(users.findBy("name", "Kim"), kim);
assert.deepStrictEqual(users.sortBy("name:desc"), [lee, kim, hong]);
assert.deepStrictEqual(users.sortBy("name"), [hong, kim, lee]);
assert.deepStrictEqual(users.firstObject, hong);
assert.deepStrictEqual(users.lastObject, lee);
users.firstObject = kim;
assert.deepStrictEqual(users.firstObject, kim);
users.lastObject = hong;
assert.deepStrictEqual(users.lastObject, hong);
