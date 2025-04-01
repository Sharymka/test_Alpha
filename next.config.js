/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.PAGES_BASE_PATH,
  assetPrefix: process.env.PAGES_BASE_PATH,
  trailingSlash: true,
}

export default nextConfig;
