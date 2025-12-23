import { use } from 'react';

type Props = {
  params: Promise<{ time: string; cmt: string }>;
};

export default function Cmt({ params }: Props) {
  const { time, cmt } = use(params);
  return (
    <h1>
      Good {time} - {cmt} comments!
    </h1>
  );
}
