const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  // FIXME: set this to true once @headlessui/react Transition component is compatible with React 18
  // See https://github.com/tailwindlabs/headlessui/issues/681
  reactStrictMode: false,
});
