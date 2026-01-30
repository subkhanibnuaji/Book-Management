import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/library",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
