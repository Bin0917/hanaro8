function discount(dcRate = 0.1) {
  //   const dcRate = 0.1;
  return function (price) {
    // 얘가 closure
    return price * dcRate;
  };
}

const items = [
  { item: "상품A", price: 32000 },
  { item: "상품B", price: 45000 },
];
const discounter = discount(); // discount 함수 내 closure 함수부가 들어감
const discounter2 = discount(0.2); // discount 함수 내 closure 함수부가 들어감

for (const { item, price: orgPrice } of items) {
  const salePrice = orgPrice - discounter(orgPrice);
  console.log(`🚀 ${item} salePrice:`, salePrice.toLocaleString()); // toLocaleString = 컴퓨터 기본셋팅으로 , 셋팅
}

console.log("---------------------------------");

const actions = ["입장", "입장", "입장", "퇴장", "입장", "퇴장"]; // Status Queue
// const { connect, disconnect, getCount } = currentCount(); // 디스트럭처링, 각 변수에 함수 맵핑
const [conn, disconn, getCount] = currentCount(); // 일케하면 [] 내부 변수명을 걍 바로 바꿔쓰면 됨

for (const status of actions) {
  if (status == "입장") {
    conn();
  } else {
    disconn();
  }
}
function currentCount() {
  // 함수 여러개 가진 클로저리턴 가능. 함수 선언하고 리턴에 넣어주면 됨
  let cnt = 0;
  function connect() {
    cnt++;
  }
  function disconnect() {
    cnt--;
  }
  function getCount() {
    return cnt;
  }
  //   return {
  //     connect,
  //     disconnect,
  //     getCount: function getCount() {
  //       return cnt;
  //     },
  //   };
  return [
    connect,
    disconnect,
    function () {
      return cnt;
    },
  ];
}
console.log("🚀 ~ cnt:", getCount());
