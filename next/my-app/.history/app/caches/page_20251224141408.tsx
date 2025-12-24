import { cacheTag } from 'next/cache';

async function RandomValue() {
  'use cache';
  cacheTag('random-value', 'math'); // tag등록!
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('***********', new Date());
  return Math.random();
}

export default function Page() {
  const revalidateRandom = async () => {
    'use server';
    revalidateTag('random-value', 'hours');
    // updateTag('random-value'); // 또는 'math'
  };

  return (
    <>
      <p className="m-3 border p-3">
        <RandomValue />
      </p>
      <form action={revalidateRandom}>
        <button className="btn btn-primary ml-3">Revalidate Random…</button>;
      </form>
    </>
  );
}
