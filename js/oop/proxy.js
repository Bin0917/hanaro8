const kim = { id: 1, firstName: "Namd", lastName: "kim" };

const proxyObj = new Proxy(kim, {
  get(target, prop, receiver /*=this 현상태파악을위해 함*/) {
    //x = target.fullName
    if (prop == "fullName") {
      // 들어오는 값이 fullName이면 해당을 리턴하겠다
      return `${target.firstName} ${target.lastName}`;
    }
    return target[prop];
  },
  // target.fullName = x;
  set(target, prop, value, receiver) {
    if (prop == "fullName") {
      [target.firstName, target.lastName] = value.split(" ");
    } else {
      target[prop] = value;
    }
  },
});

console.log(proxyObj.fullName, kim.fullName);
