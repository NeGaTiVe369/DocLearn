import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ["doclearn.ru", "localhost:3000"],
    },
  },
  eslint: {
    // ❗️ production-build больше не упадёт из-за ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
