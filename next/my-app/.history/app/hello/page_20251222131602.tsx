// 'use client'; // 클라이언트 컴포를 가지고 있는 페이지에 붙여줌. 사실 sayhello에 잇는게 맞음

import SayHello from './SayHello';

export default function HelloPage() {
  return (
    <>
      <h1>hello Page</h1>
      <SayHello name="Binbin" />
    </>
  );
}
