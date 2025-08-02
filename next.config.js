/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable image optimization for static assets
  images: {
    unoptimized: true
  },
  // Ensure static assets are served correctly
  assetPrefix: '',
  // Enable static exports
  trailingSlash: true,
  // Copy static assets to build output
  experimental: {
    appDir: true
  },
  // Ensure public folder is copied
  distDir: '.next',
  // Handle static assets
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;