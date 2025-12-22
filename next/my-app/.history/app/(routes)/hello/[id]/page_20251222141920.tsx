// 'use client';

import { use } from 'react';

// import { useParams } from 'next/navigation';

type Props = {
  params: Promise<{ id: number }>;
};
export default function HelloId({ params }: Props) {
  //   const { id } = useParams<{ id: string }>();
  const { id } = use(params); // 서버단에선 비동기 프로미스 받을 수 있음
  return `Hello, id is ${id}`;
}
