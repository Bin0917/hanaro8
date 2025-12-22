// 'use client';

import { use } from 'react';

// import { useParams } from 'next/navigation';

type Props = {
  params: Promise<{ id: number }>;
};
export default function HelloId({ params }: Props) {
  //   const { id } = useParams<{ id: string }>();
  const { id } = use(params);
  return `Hello, id is ${id}`;
}
