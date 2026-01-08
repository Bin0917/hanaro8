import { NextResponse } from 'next/server';
import { toActivityData } from '@/lib/contribution-utils';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const posts = await prisma.post.findMany({
    where: {
      createdAt: { gte: oneYearAgo },
    },
    select: { createdAt: true },
  });

  const data = toActivityData(posts);
  return NextResponse.json(data);
}
