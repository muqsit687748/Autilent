/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable image optimization
  images: {
    unoptimized: true
  },
  // Ensure static assets are served
  assetPrefix: '',
  // Enable static exports
  trailingSlash: true,
  // Copy static assets during build
  experimental: {
    appDir: true
  }
};

module.exports = nextConfig;