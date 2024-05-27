/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      },
      {
        protocol: 'http',
        hostname: '**'
      }
    ],
    minimumCacheTTL: 2592000 // 30 days
  },
  output: 'standalone'
}

module.exports = nextConfig
