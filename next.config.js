/** @type {import('next').NextConfig} */

// allow all domainds with http and https wildcard
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
