// app/sitemap.ts

import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'http://localhost:3000';

  // 1) 정적 페이지들
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ];

  // 2) DB에서 게시글 가져오기
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: 'desc' },
  });

  // 3) 게시글을 sitemap 형식으로 변환
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.id}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 4) 폴더(게시판) 목록도 추가 (선택)
  const folders = await prisma.folder.findMany({
    select: { id: true },
  });

  const folderRoutes = folders.map((folder) => ({
    url: `${baseUrl}/${folder.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...folderRoutes, ...postRoutes];
}
