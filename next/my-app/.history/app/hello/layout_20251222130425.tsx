import Link from 'next/link';
import type { PropsWithChildren } from 'react';

export default function HelloLayout({ children }: PropsWithChildren) {
  return (
    <>
      <h1>hello layout</h1>
      <div>
        <Link href={'/'}>HOme</Link>
        <Link href={'/hello'}>Hello</Link>
        <Link href={'/hello/morning'}>morning</Link>
      </div>
      <div className="border p-5 text-center">{children}</div>
    </>
  );
}
