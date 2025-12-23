import Link from 'next/link';
import type { PropsWithChildren } from 'react';
export const TIMES = ['morning', 'afternoon', 'evening'];

export default function HiLayout({ children }: PropsWithChildren) {
  return (
    <div className="border-2 border-green-300">
      <div className="flex gap-3">
        {TIMES.map((time) => (
          <Link key={time} href={`/hi/${time}`}>
            {time}
          </Link>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
}
