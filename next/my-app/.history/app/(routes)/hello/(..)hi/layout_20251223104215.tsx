import Link from 'next/link';
import type { PropsWithChildren } from 'react';

export default function HInterceptLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex gap-2">
      <div>
        hello/(..)hi
        <Link href={'/morning'}>morning/H</Link>
        <Link href={'/afternoon'}>afternoon/H</Link>
        <Link href={'/evening'}>evening/H</Link>
      </div>
      <div>{children}</div>
    </div>
  );
}
