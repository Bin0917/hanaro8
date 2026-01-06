import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import PostStreak from '@/components/PostStreack';
import { toActivityData } from '@/lib/contribution-utils';
import { getFolders } from '@/lib/posts.action';
import { prisma } from '@/lib/prisma';

export default async function pageLayout({ children }: PropsWithChildren) {
  const folders = await getFolders();

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const posts = await prisma.post.findMany({
    where: {
      createdAt: { gte: oneYearAgo },
    },
    select: { createdAt: true },
  });

  const data = toActivityData(posts);

  return (
    <>
      <div className="p-6">
        <PostStreak data={data} />
      </div>

      <div className="flex rounded-md p-5 shadow-md">
        {/* 카테고리 nav바 */}
        <nav className="gap-1 rounded-md p-3 shadow-md">
          <div className="space-y-2">
            {folders.map((folder) => {
              return (
                <Link
                  className="flex items-center justify-between gap-2 rounded-xl p-2 shadow-sm"
                  href={`/${folder.id}`}
                  key={folder.id}
                >
                  <span className="flex-1">{folder.title}</span>
                  <span className="text-neutral-400 text-sm">
                    ({folder.readcnt}개)
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
        {children}
      </div>
    </>
  );
}
