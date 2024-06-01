/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@packages/utils"],
  experimental: {
    reactCompiler: true,
  },
};

module.exports = nextConfig;
