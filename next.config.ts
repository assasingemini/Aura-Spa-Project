import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dvlpkot5z/**",
      },
    ],
  },
  // Suppress Edge Runtime warnings from jose/next-auth during build
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.ignoreWarnings = [
        { module: /node_modules\/jose/ },
        { module: /node_modules\/@prisma/ },
        { module: /node_modules\/bcryptjs/ },
      ];
    }
    return config;
  },
};

export default nextConfig;
