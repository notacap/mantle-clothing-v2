/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['mantle-clothing.com', 'i.imgur.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mantle-clothing.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
