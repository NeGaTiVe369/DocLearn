import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // 1) широкий допуск (достаточно для <Image>)
    // domains: ['storage.googleapis.com'],

    // 2) точный контроль по пути (рекомендуется)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/dl-ld-scm/avatars/**', // только папка с аватарами
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true,
  },

  experimental: {
    serverActions: {
      allowedOrigins: ["doclearn.ru", "localhost:3000"],
    },
  },
  eslint: {
    // production-build больше не упадёт из-за ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
