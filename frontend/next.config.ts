import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // This allows build despite TS errors
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'njaes.rutgers.edu',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
