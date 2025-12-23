import type { PropsWithChildren } from 'react';

export default function HInterceptLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex gap-2">
      <div>hello/(..)hi</div>
      <div>{children}</div>
    </div>
  );
}
