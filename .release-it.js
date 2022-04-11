module.exports = {
  github: {
    release: true,
    releaseName: "Release ${version}",
  },
  npm: {
    publish: false,
  },
  git: {
    requireBranch: "develop",
    tag: true,
    commit: true,
    commitMessage: "chore(release): release ${version}",
  },
  hooks: {
    "after:init": ["yarn format", "yarn lint"],
    "after:bump": ["yarn build"],
  },
  plugins: {
    "@release-it/bumper": {
      in: "package.json",
      out: "apps/web/src/version.json",
    },
    "@release-it/conventional-changelog": {
      infile: "CHANGELOG.md",
      preset: {
        name: "conventionalcommits",
        types: [
          { type: "feat", section: "Features" },
          { type: "fix", section: "Bug Fixes" },
          { type: "deps", section: "Dependencies" },
          { type: "docs", section: "Documentation" },
          { type: "chore", section: "Internal" },
          { type: "tooling", section: "Internal" },
          { type: "revert", section: "Reverts" },
        ],
      },
    },
  },
};
