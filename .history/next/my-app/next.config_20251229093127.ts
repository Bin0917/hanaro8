import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // basePath: "/post",
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  // 타입의 주소랑 뭐 이것저것 자동 캐칭(갈 수 있는, 쓸 수 있는것만 띄워줌)
  // 이것도 과제때 보신다고 함. 아래것들 잘 적을 것
  experimental: {
    typedEnv: true,
  },
  typedRoutes: true,
  // Image 최적화를 위해 등록
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
