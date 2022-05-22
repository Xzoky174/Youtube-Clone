/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments = { topLevelAwait: true, layers: true };
    return config;
  },
};

module.exports = nextConfig;
