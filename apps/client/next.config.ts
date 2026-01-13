import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Permissive for MVP/Demo
      },
    ],
  },
};

export default nextConfig;
