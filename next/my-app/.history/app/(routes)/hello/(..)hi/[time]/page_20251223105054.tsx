import { use } from 'react';
import { TIMES } from '@/app/(routes)/hi/constants';

type Props = {
  params: Promise<{ time: 'morning' | 'afternoon' | 'evening' }>;
};

// [{time : 'morning}, {} ,...]
export const generateStaticParams = async () => {
  return TIMES.map((time) => ({ time }));
};

export default function Hitime({ params }: Props) {
  const { time } = use(params);
  return <h1>Hello/(..)hi/{time}</h1>;
}
