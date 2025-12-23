import { use } from 'react';

type Props = {
  params: Promise<{ time: string; cmt: string }>;
};

export const generateStaticParams = (params: { time: string }) => {
  const { time } = params;

  if (time === 'morning') {
    return [{ cmt: 1 }, { cmt: 2 }, { cmt: 3 }];
  } else if (time === 'afternoon') {
    return [{ cmt: 4 }, { cmt: 5 }, { cmt: 6 }];
  }
  return [{ cmt: 7 }, { cmt: 8 }, { cmt: 9 }];
};

export default function Cmt({ params }: Props) {
  // time 이랑 cmt 받아오기..
  const { time, cmt } = use(params);

  return (
    <h1>
      Good {time} - {cmt} comments!
    </h1>
  );
}
