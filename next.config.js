/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const nextConfig = {
  reactStrictMode: true,
  env: {
    HOME_URL: isProd ? 'https://dangtuanvu.com/app' : 'http://localhost:3000',
    BASE_URL: 'https://shop.shadespace.com.sg',
    PREFIX_URL: isProd ? 'app' : '',
  },
  assetPrefix: isProd ? 'app' : '',
}

module.exports = nextConfig
