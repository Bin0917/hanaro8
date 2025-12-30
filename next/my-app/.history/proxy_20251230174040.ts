import { type NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';

// spring의 필터역할. springSequrity에서 본 느낌임
export async function proxy(req: NextRequest) {
  const session = await auth(); // 현재 로그인 된 정보를 가져옴
  const didLogin = !!session?.user; // 유저 존재 유무로 로그인 현황확인
  // const didLogin = req.cookies.has('nextjs');
  //   if (!didLogin) redirect("/");
  // if (!didLogin) return NextResponse.json({ msg: '로그인해' });
  if (!didLogin) {
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname);
    return NextResponse.redirect(
      new URL(`/sign?callbackUrl=${callbackUrl}`, req.url),
    );
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/caches',
    // '/admin', // => 이 주소로 오면 proxy함수 실행! (리턴 위에 코드들)
    // '/((?!login|regist|_next/static|_next/image|auth|favicon.ico|robots.txt|api/auth|images|$).*)',
    // "/api/:path*",
    // "posts/:postId*/edit",
  ],
};
