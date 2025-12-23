import { use } from 'react';
import { TIMES } from '../constants';

type Props = {
  params: Promise<{ time: string }>;
};

export function generateStaticParams() {
  return TIMES.map((time) => ({ time }));
}

export default function Hi({ params }: Props) {
  const { time } = use(params);
  return <>안녕하세요 지금은 {time} 입니다</>;
}
