import type { NextConfig } from "next";

const FIREBASE_AUTH_DOMAIN_REWRITE =
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_REWRITE;

const nextConfig: NextConfig = {
  async rewrites() {
    if (FIREBASE_AUTH_DOMAIN_REWRITE) {
      return [
        {
          source: "/__/auth/:path*",
          destination: `https://${FIREBASE_AUTH_DOMAIN_REWRITE}/__/auth/:path*`,
        },
      ];
    } else return [];
  },
};

export default nextConfig;
