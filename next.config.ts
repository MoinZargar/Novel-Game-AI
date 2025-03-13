import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v3.fal.media",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
