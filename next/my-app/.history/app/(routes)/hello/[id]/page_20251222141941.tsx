// 'use client';

import { use } from 'react';

// import { useParams } from 'next/navigation';

type Props = {
  params: Promise<{ id: number }>; // 서버에서 받는거라 파라미터를 프로미스로 받음
};
export default function HelloId({ params }: Props) {
  //   const { id } = useParams<{ id: string }>();
  const { id } = use(params); // 서버단에선 비동기 프로미스 받을 수 있음
  return `Hello, id is ${id}`;
}
