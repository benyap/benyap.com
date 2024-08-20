/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  transpilePackages: ["@packages/utils"],
  experimental: {
    reactCompiler: true,
    instrumentationHook: true,
  },
};

export default nextConfig;
