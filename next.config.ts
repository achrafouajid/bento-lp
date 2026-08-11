import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,
};

export default nextConfig;
