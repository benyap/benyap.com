const CI = process.env.CI;

async function main() {
  // Install husky
  if (CI) console.log("⏭️ Skipping husky install");
  else
    import("husky")
      .then((module) => module.default())
      .then(console.log("✅ Installed husky"));
}

main().then(() => {
  console.log("✨ Successfully run setup script");
});
