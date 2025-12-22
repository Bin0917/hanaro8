import Link from 'next/link';
import type { PropsWithChildren } from 'react';

export default function HelloLayout({ children }: PropsWithChildren) {
  return (
    <>
      <h1>hello layout</h1>
      <Link href={'/'}>HOme</Link>
      <div>{children}</div>
    </>
  );
}
