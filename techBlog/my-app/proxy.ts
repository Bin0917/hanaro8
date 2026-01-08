import { type NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';
import { logout } from './lib/sign.action';

export async function proxy(req: NextRequest) {
  const session = await auth();
  const isAdmin = !!session?.user.isadmin;

  // 어드민 상태가 아닐시
  if (!isAdmin) {
    if (session?.user) {
      logout();
    }
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname);

    return NextResponse.redirect(
      new URL(`/sign?callbackUrl=${callbackUrl}`, req.url),
    );
  }

  // 검사마무리 후 통과시켜주기
  return NextResponse.next();
}

export const config = {
  matcher: ['/write/edit', '/userList', '/write/edit/:path'],
};
