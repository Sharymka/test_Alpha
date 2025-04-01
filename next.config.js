/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: '/test_Alpha',
  assetPrefix: '/test_Alpha/',
}

module.exports = nextConfig 

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "export",  // <=== enables static exports
//   reactStrictMode: true,
// };

// module.exports = nextConfig;