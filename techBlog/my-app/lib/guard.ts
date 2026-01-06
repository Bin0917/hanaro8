// lib/guards.ts
'use server';

import { auth } from '@/lib/auth';

// 로그인 되어있어야 action 가능
export async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');
  return { userId: Number(session.user.id), isAdmin: !!session.user.isadmin };
}

// admin만 action 가능
export async function requireAdmin() {
  const { isAdmin } = await requireUser();
  if (!isAdmin) throw new Error('Forbidden');
}

// 둘 다 가능
export async function requireOwnerOrAdmin(ownerId: number) {
  const { userId, isAdmin } = await requireUser();
  if (!isAdmin && userId !== ownerId) throw new Error('Forbidden');
  return { userId, isAdmin };
}
