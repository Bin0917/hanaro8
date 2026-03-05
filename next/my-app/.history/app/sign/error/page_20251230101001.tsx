import { use } from 'react';

type Props = {
  searchParams: Promise<{ error: string }>;
};

export default function SignError({ searchParams }: Props) {
  const { error } = use(searchParams);
  return (
    <>
      <h1 className="text-2xl">Sign error</h1>
      <div className="text-red-500">{error}</div>
    </>
  );
}
