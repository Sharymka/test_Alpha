/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/test_Alpha' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/test_Alpha/' : '',
}

module.exports = nextConfig 

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "export",  // <=== enables static exports
//   reactStrictMode: true,
// };

// module.exports = nextConfig;