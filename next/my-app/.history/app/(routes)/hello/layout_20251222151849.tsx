import Link from 'next/link';
import { type PropsWithChildren, Suspense } from 'react';

export default function HelloLayout({ children }: PropsWithChildren) {
  return (
    <>
      <h1>hello layout</h1>
      <div className="flex gap-2">
        <Link href={'/'}>HOme</Link>
        <Link href={'/hello'}>Hello</Link>
        <Link href={'/hello/morning'}>morning</Link>
      </div>
      <Suspense fallback={'...'}>
        <div className="border p-5 text-center">{children}</div>
      </Suspense>
    </>
  );
}
