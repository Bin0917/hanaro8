// 'use client';

// import { useParams } from 'next/navigation';

type Props = {
  params: { id: number };
};
export default function HelloId({ params }: Props) {
  //   const { id } = useParams<{ id: string }>();
  // const{ id }= params;
  return `Hello, id is ${params.id}`;
}
