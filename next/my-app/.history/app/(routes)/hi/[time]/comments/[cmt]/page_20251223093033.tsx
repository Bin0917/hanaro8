import { use } from 'react';
import { TIMES } from '../../../constants';

type Props = {
  params: Promise<{ time: string; cmt: string }>;
};

// 이따 받는 값이 프로미스라 async 걸어주어야함
// export const generateStaticParams = async ({
//   params,
// }: {
//   params: { time: string }; // 조건!!! 객체에 담겨옴!!
// }) => {
//   //프로미스를 받는게 아닌, 상위 세그먼트에서 인자로 전달받음 =>
//   // 빌드 이후에 받는 불특정 데이터가 아닌
//   // 빌드시 받는 정해진 값이기 때문에..
//   const { time } = params;

//   if (time === 'morning') {
//     return [{ cmt: '1' }, { cmt: '2' }, { cmt: '3' }];
//   } else if (time === 'afternoon') {
//     return [{ cmt: '4' }, { cmt: '5' }, { cmt: '6' }];
//   }
//   return [{ cmt: '7' }, { cmt: '8' }, { cmt: '9' }];
// };
export const generateStaticParams = async () => {
  return TIMES.flatMap((time, i) =>
    [1, 2, 3].map((cmt) => ({ time, cmt: i * 3 + cmt })),
  );
};
export default function Cmt({ params }: Props) {
  // time 이랑 cmt 받아오기, 자식은 부모들의 파라미터를 전부 받을 수 있다.
  const { time, cmt } = use(params);

  return (
    <h1>
      {JSON.stringify(generateStaticParams())}
      Good {time} - {cmt} comments!
    </h1>
  );
}
