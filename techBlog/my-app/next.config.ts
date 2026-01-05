import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // 타입 주소 및 기타 자동 캐칭
  typedRoutes: true,
  experimental: {
    typedEnv: true,
  },
};

export default nextConfig;
