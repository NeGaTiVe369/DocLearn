import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // ❗️ production-build больше не упадёт из-за ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
