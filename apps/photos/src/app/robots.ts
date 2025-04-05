import { MetadataRoute } from "next";

import { APP_IS_PRODUCTION } from "~/constants/app";

export default function robots(): MetadataRoute.Robots {
  if (APP_IS_PRODUCTION)
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
