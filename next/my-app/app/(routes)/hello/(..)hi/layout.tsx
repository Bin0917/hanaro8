import Link from 'next/link';
import type { PropsWithChildren } from 'react';

export default function HInterceptLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex gap-2">
        <div>hello/(..)hi</div>
        <div>
          <Link href={'/hi/morning'}>morning/H</Link>
        </div>
        <div>
          <Link href={'/hi/afternoon'}>afternoon/H</Link>
        </div>
        <div>
          <Link href={'/hi/evening'}>evening/H</Link>
        </div>
      </div>
      <div>{children}</div>
    </>
  );
}
