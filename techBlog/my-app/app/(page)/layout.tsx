import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import { toActivityData } from '@/lib/contribution-utils';
import { getFolders } from '@/lib/posts.action';
import { prisma } from '@/lib/prisma';
import PostStreak from './PostStreack';

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

      {/* 카테고리 nav바 */}
      <div className="flex rounded-md border p-5 shadow-2xs">
        <nav className="gap-2 rounded-md border p-3 shadow-2xs">
          {folders.map((folder) => {
            return (
              <Link
                className="flex gap-2"
                href={`/${folder.id}`}
                key={folder.id}
              >
                {folder.title}{' '}
                <p className="text-emerald-200 text-sm">{folder.readcnt}개</p>
              </Link>
            );
          })}
        </nav>
        {/* 메인 페이지들! */}
        {children}
      </div>
    </>
  );
}
