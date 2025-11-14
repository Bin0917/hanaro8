function sum100() {
  let sum = 0;
  for (let i = 1; i <= 100; i++) {
    sum += i;
  }
  return sum;
}

console.log("sum100 >> ", sum100());

function sum100Recur(n = 1) {
  if (n == 100) {
    return n;
  }
  return n + sum100Recur(n + 1);
}

console.log("recur >> ", sum100Recur());

function fact(n) {
  let ret = 1;
  while (n > 1) {
    ret *= n;
    n--;
  }
  return ret;
}
console.log("🚀 ~ fact ~ fact:", fact(5));

function factorial(n) {
  if (n == 1) {
    return n;
  }
  return n * factorial(n - 1);
}
console.log("🚀 ~ fact ~ fact:", factorial(5));

function factorialTCO(n, acc = 1) {
  if (n === 1) return acc;
  return factorialTCO(n - 1, acc * n);
}
console.log("🚀 ~ fact ~ fact:", factorialTCO(5));
