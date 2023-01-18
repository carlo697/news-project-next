/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "", pathname: "/**" },
    ],
  },
};

module.exports = nextConfig;
