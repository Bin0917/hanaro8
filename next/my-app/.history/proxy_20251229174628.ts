import { type NextRequest, NextResponse } from 'next/server';

// spring의 필터역할. springSequrity에서 본 느낌임
export function proxy(req: NextRequest) {
  const didLogin = req.cookies.has('nextjs');
  //   if (!didLogin) redirect("/");
  if (!didLogin) return NextResponse.json({ msg: '로그인해' });

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/admin', // => 이 주소로 오면 proxy함수 실행! (리턴 위에 코드들)
    // '/((?!login|regist|_next/static|_next/image|auth|favicon.ico|robots.txt|api/auth|images|$).*)',
    // "/api/:path*",
    // "posts/:postId*/edit",
  ],
};
