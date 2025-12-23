import { use } from 'react';

type Props = {
  params: Promise<{ time: 'morning' | 'afternoon' | 'evening' }>;
};

export default function Hitime({ params }: Props) {
  const { time } = use(params);
  return (
    <h1>
      Good <strong className="capitalize">{time}</strong>
    </h1>
  );
}
