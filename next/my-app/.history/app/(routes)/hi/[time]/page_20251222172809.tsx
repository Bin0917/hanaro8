import { use } from 'react';
import { TIMES } from '../constants';

type Props = {
  params: Promise<{ time: 'morning' | 'afternoon' | 'evening' }>;
};

// export async function generateStaticParams() {
//   return [[{ time: 'morning' }, { time: 'afternoon' }, { time: 'evening' }]];
// }

//
export const generateStaticParams = async () => {
  return TIMES.map((time) => ({ time }));
};

// 다이나믹은 use 를 많이 쓴다!
export default function Hitime({ params }: Props) {
  const { time } = use(params);
  return (
    <h1>
      Good <strong className="capitalize">{time}</strong>
    </h1>
  );
}

// 값이 들어오면 그때 바꿈..?
// ㄴ ssr = 파라미터 받고 그제서야 렌더시작 받아야할 부분은 suspense 로 잠깐
// 다른거보여주기~ 했다가 값 오면 넣기?

// ssg : 일단 html 만들어!
