// 'use client';

// import { useParams } from 'next/navigation';

type Props = {
  params: Promise<{ id: number }>;
};
export default async function HelloId({ params }: Props) {
  //   const { id } = useParams<{ id: string }>();
  const { id } = await params;
  return `Hello, id is ${id}`;
}
