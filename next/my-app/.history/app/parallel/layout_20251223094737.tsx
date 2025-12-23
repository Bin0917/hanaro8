import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  login: ReactNode;
  profile: ReactNode;
};

export default function ParallelLayout({ children, login, profile }: Props) {
  return (
    <div>
      <h1 className="text-center">Parallel page</h1>
      <div className="flex gap-3">
        <Link href={'/parallel/aaa'}>AAA</Link>
        <Link href={'/parallel/bbb'}>BBB</Link>
      </div>

      <div className="">{children}</div>
      <div className="grid grid-cols-2 gap-2">
        <div className="border">{login}</div>
        <div className="border">{profile}</div>
      </div>
    </div>
  );
}
