// 'use client'; // 클라이언트 컴포를 가지고 있는 페이지에 붙여줌. 사실 sayhello에 잇는게 맞음

import { Suspense } from 'react';
import SayHello from './SayHello';

export default function HelloPage() {
  return (
    <>
      <h1>hello Page</h1>
      <Suspense fallback={<h1>오마이갓</h1>}></Suspense>
      <SayHello name="Binbin" />
    </>
  );
}
