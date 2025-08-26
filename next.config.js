/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
  // Enable source maps for better debugging
  productionBrowserSourceMaps: true,
  // Enable webpack bundle analyzer in development
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Add source map support for better debugging
      config.devtool = 'eval-source-map';
    }
    return config;
  },
}

module.exports = nextConfig
