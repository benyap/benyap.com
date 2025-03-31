import type { Config } from "@svgr/core";

import template from "./template";

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
      "cleanupIds",
      "removeXMLNS",
      "removeMetadata",
      "removeUnusedNS",
      "removeUselessDefs",
      "removeUnknownsAndDefaults",
    ],
  },
  template,
};

export default config;
