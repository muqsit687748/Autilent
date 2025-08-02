/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable image optimization
  images: {
    unoptimized: true
  },
  // Ensure static assets are served
  assetPrefix: '',
  // Enable static exports
  trailingSlash: true
};

module.exports = nextConfig;