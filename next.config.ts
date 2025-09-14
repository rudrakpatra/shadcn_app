import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  
  // Enable static export for GitHub Pages
  output: process.env.NODE_ENV === 'production' && process.env.GITHUB_ACTIONS ? 'export' : undefined,
  
  // Configure base path for GitHub Pages if needed
  basePath: process.env.GITHUB_ACTIONS ? '/shadcn_app' : undefined,
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Ensure trailing slash for GitHub Pages
  trailingSlash: true,
};

export default nextConfig;
