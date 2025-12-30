import { type NextRequest, NextResponse } from 'next/server';

// spring의 필터역할. springSequrity에서 본 느낌임
export function proxy(req: NextRequest) {
  const didLogin = req.cookies.has('nextjs');
  //   if (!didLogin) redirect("/");
  if (!didLogin) return NextResponse.json({ msg: '로그인해' });

  return NextResponse.next();
}
export const config = {
  //     matcher:[
  //     "/photos",
  //     "/api/books/:path*",
  // ]

  // 인증 없어도 되는 녀석들 작성해주기 (spring sequrity처럼)
  matcher: [
    '/admin',
    // '/((?!login|regist|_next/static|_next/image|auth|favicon.ico|robots.txt|api/auth|images|$).*)',
    // "/api/:path*",
    // "posts/:postId*/edit",
  ],
};
