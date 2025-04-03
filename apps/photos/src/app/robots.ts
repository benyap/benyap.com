import { MetadataRoute } from "next";

import { isProduction } from "~/constants/app";

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
