/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['mantle-clothing.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mantle-clothing.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
