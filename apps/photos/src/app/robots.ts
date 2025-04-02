import { MetadataRoute } from "next";

import { isProduction } from "~/constants/vercel";

export default function robots(): MetadataRoute.Robots {
  if (isProduction())
    return {
      rules: {
        userAgent: "*",
        allow: "/",
      },
    };

  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
