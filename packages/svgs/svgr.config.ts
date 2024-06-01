import type { Config } from "@svgr/core";

import template from "./templates/component";

const config: Config = {
  typescript: true,
  dimensions: false,
  svgProps: {
    className: "{className}",
    fill: "currentColor",
    ref: "{forwardedRef}",
  },
  replaceAttrValues: {},
  plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
  svgoConfig: {
    multipass: true,
    plugins: [
      "removeDimensions",
      "convertStyleToAttrs",
      "inlineStyles",
      "minifyStyles",
      "cleanupAttrs",
    ],
  },
  template,
};

export default config;
