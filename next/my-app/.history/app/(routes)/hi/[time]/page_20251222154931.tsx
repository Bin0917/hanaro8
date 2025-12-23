import { use } from 'react';

type Props = {
  params: Promise<{ time: 'morning' | 'afternoon' | 'evening' }>;
};

export async function generateStaticParams() {
  return [[{ time: 'morning' }, { time: 'afternoon' }, { time: 'evening' }]];
}

export default function Hitime({ params }: Props) {
  const { time } = use(params);
  return (
    <h1>
      Good <strong className="capitalize">{time}</strong>
    </h1>
  );
}

// 값이 들어오면 그때 바꿈..?
