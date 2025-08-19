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
    domains: [
      'images.unsplash.com',
      'cdn.sanity.io',
      '**.gravatar.com',
      '**.wordpress.com',
      '**.wp.com',
      new URL(process.env.WORDPRESS_URL || 'https://example.com').hostname,
    ],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' }
    ],
  },
}

export default nextConfig
