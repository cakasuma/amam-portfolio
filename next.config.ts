import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // basePath is only needed if deploying to a subdirectory like /repo-name
  // For custom domains or username.github.io repos, leave it empty
  // basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default nextConfig;
