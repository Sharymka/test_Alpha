/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/test_Alpha' : '',
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.PAGES_BASE_PATH,
  trailingSlash: true,
}

module.exports = nextConfig;
