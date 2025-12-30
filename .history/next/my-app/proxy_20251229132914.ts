import { NextRequest } from "next/server";

export function proxy(req: NextRequest) {}
export const config = {
  matcher: ["/photos", "/api/folders/:path*"],
};
