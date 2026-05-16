import type { NextConfig } from "next";

const BFF_URL = process.env.BFF_URL ?? "http://localhost:8082";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BFF_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
