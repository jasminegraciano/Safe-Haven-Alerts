/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  async rewrites() {
    return [];
  },
  // Add this if you're using the Google Maps component
  compiler: {
    styledComponents: true,
  }
}

module.exports = nextConfig 