'use client'; // 클라이언트 컴포를 가지고 있는 페이지에 붙여줌. 사실 sayhello에 잇는게 맞음

import type { Route } from 'next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import SayHello from './SayHello';

export default function HelloPage() {
  const pathname = usePathname();

  return (
    <>
      <h1>hello Page: {pathname} </h1>
      <div>
        <Suspense>
          <SayHello name={'빈'} />
        </Suspense>

        <Suspense fallback={<h1>오마이갓</h1>}>
          <SearchParamId />
        </Suspense>
      </div>
    </>
  );
}

function SearchParamId() {
  // 아래 얘를 suspense로 감싸야함 => 함수화해서 빼줌
  // 꼬옥 searchParam만? 엉. 그 url 확인하거나 오고가는 값을 다루면 쓰는듯
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const pathname = usePathname();

  const id = searchParams.get('id');
  // const name = searchParams.get('name');

  const router = useRouter(); // 페이지 이동에 쓰임

  const make200 = () => {
    params.set('id', `200`); // 이걸로 바로 바뀌지않음. 서버와 통신 필수!! => 주소창이 바뀌기 + 새로고침까쥐
    router.push(`${pathname}?${params.toString()}` as Route);
  };
  // 당근빠다 jsx 리턴 필요
  return <button onClick={make200}>ID: {id}</button>;
}
