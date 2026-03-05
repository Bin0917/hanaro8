import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const didLogin = req.cookies.has("nextjs");
  if (!didLogin) redirect("/");

  return NextResponse.next();
}
export const config = {
  matcher: ["/photos", "/api/books/:path*"],
};
