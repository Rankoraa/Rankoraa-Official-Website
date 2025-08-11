/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.gravatar.com' },
      { protocol: 'https', hostname: '**.wordpress.com' },
      { protocol: 'https', hostname: '**.wp.com' },
      { protocol: 'https', hostname: new URL(process.env.WORDPRESS_URL || 'https://example.com').hostname },
    ],
  },
}

export default nextConfig
