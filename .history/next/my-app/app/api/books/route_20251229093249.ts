import { NextRequest, NextResponse } from "next/server";
import nextConfig from "../../../next.config";

// 함수이름은 대문자로 method 써주는게 고정
// 보통은 response, request를 받지만,
// next는 request 만 받고, 이 함수가 리턴하는 값을
// 알아서 response로 처리해서 전달해줌 (NextResponse 타입)
export async function GET(req: NextRequest) {
  const { host, hostname, searchParams, origin, pathname, basePath } =
    req.nextUrl;

  const nextConfig = NextResponse.json({
    host,
    hostname,
    pathname,
    origin,
    basePath,
    q: searchParams.get("q"),
  });
  return nextConfig;
}
