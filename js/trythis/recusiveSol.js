// tco는 아예 모르겟음 아
// makeArray도 모르겟음 복습 ㄱㄱ

const ma10 = makeArray(10);
console.log("🚀 ~ ma10:", ma10);

function makeArrayLoop(n) {
  //반복문
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i + 1);
  }
  return arr;
  // return Array.from({length:n}, (_,i)=> i+1);
  // if(n == 1) 1;
  // return [10]
  //[10]
}

function makeArray(n) {
  if (n == 1) return [1]; //[1]로 배열 생성
  return [...makeArray(n - 1), n]; // ...는 배열으 펼쳐야하니까 스프레드/ makeArray(n-1) 로 1~(n-1) 표현, 순차로 풀꺼니까 n갑승ㄹ 뒤에 둠
  // [10] -> [9,10] -> [8,9,10]
}
// flow!!!!!!! ... 쓰는 이유!!!
// makeArray(1) -> [1]
// makeArray(2) -> [... [1], 2] → [1][2]
// makeArray(3) -> [... [1][2], 3] → [1][2][3]

function makeReverseArray(n) {
  if (n == 1) return [1];
  return [n, ...makeArray(n - 1)]; // ...는 배열으 펼쳐야하니까 스프레드
  // [10] -> [9,10] -> [8,9,10]
}

//  cf. 위 makeArray를 TCO로 작성하시오.
const maTCO = makeArrayTCO(10);
console.log("🚀 ~ maTCO:", maTCO);

function makeArrayTCO(n, acc = []) {
  if (n == 1) return [1, ...acc];
  return makeArrayTCO(n - 1, [n, ...acc]);
  // [10] -> [9, ...[10]] -> [8,...[9,10]]
  //  호출 1: acc = [] → [10, ...[]] = [10]
  // 호출 2: acc = [10] → [9, ...[10]] = [9][10]
  // 호출 3: acc = [9][10] → [8][9][10]
}
