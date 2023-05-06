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
    ]
  }
}

module.exports = nextConfig
