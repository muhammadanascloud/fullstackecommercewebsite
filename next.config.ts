import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'], // Sanity CDN hostname
  },
};

export default nextConfig;
