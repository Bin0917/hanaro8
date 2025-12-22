'use client'; // 클라이언트 컴포를 가지고 있는 페이지에 붙여줌. 사실 sayhello에 잇는게 맞음

import { usePathname, useSearchParams } from 'next/navigation';
import SayHello from './SayHello';

export default function HelloPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const id = searchParams.get('id');
  const name = searchParams.get('name');

  const make200 = () => {
    params.set('id', `200`);
  };
  return (
    <>
      <h1>
        hello Page: {id} - {pathname}{' '}
      </h1>
      <div>
        {/* <Suspense fallback={<h1>오마이갓</h1>}> */}
        <SayHello name={name ?? '빈'} />
        {/* </Suspense> */}
        <button onClick={make200}>200</button>
      </div>
    </>
  );
}
