import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sites that next/image is allowed to load images from.
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
