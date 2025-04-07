/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    appDir: true,
  },
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.PAGES_BASE_PATH,
  trailingSlash: true,
}

module.exports = nextConfig;
