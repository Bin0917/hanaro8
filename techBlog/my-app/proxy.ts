import { type NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';

export async function proxy(req: NextRequest) {
  const session = await auth();
  const isLogin = !!session?.user;

  // 로그인 상태가 아닐시
  if (!isLogin) {
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname);

    return NextResponse.redirect(
      new URL(`/sign?callbackUrl=${callbackUrl}`, req.url),
    );
  }

  // 검사마무리 후 통과시켜주기
  return NextResponse.next();
}

export const config = {
  matcher: ['/write/edit'],
};
