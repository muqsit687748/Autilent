/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static asset optimization
  images: {
    unoptimized: true
  },
  // Ensure static assets are served correctly
  assetPrefix: '',
  // Enable static exports
  trailingSlash: true,
  // Ensure public folder is properly handled
  experimental: {
    appDir: true
  }
};

module.exports = nextConfig;
