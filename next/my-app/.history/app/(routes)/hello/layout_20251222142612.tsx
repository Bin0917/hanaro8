import Link from 'next/link';
import type { PropsWithChildren } from 'react';

export default function HelloLayout({ children }: PropsWithChildren) {
  return (
    <>
      <h1>hello layout</h1>
      <div className="flex gap-2">
        <Link href={'/'}>HOme</Link>
        <Link href={'/hello'}>Hello</Link>
        <Link href={'/hello/morning'}>morning</Link>
      </div>

      <nav className="flex gap-2">
        <Link href={'/morning'}>Morning</Link>
        <Link href={'/Afernoon'}>Afernoon</Link>
        <Link href={'/Evening'}>Evening</Link>
      </nav>
      <div className="border p-5 text-center">{children}</div>
    </>
  );
}
