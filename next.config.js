/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/:path*'
      }
    ]
  },
    images: {
        remotePatterns: [
          {
            hostname: 'res.cloudinary.com'
          },
        ],
      },
}
module.exports = nextConfig
