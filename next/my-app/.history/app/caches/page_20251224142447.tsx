import { cacheTag, revalidateTag, updateTag } from 'next/cache';

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
    // revalidateTag('random-value', 'hours');
    revalidateTag('random-value', { expire: 0 });
  };

  const updateRandom = async () => {
    'use server';
    updateTag('random-value'); // 또는 'math'
  };

  return (
    <>
      <p className="m-3 border p-3">
        <RandomValue />
      </p>
      <form>
        <button formAction={revalidateRandom} className="btn btn-primary ml-3">
          Revalidate Random…
        </button>
        ;
        <button formAction={updateRandom} className="btn btn-primary ml-3">
          update Random…
        </button>
        ;
      </form>
    </>
  );
}
