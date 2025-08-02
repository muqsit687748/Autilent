/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static asset optimization
  images: {
    unoptimized: true
  },
  // Ensure public assets are served correctly
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // Enable static exports if needed
  trailingSlash: true,
};

module.exports = nextConfig;
