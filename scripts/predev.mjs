// Check that the Firestore emulator has been started.

const res = await fetch("http://127.0.0.1:4400").catch((error) => {
  console.error(error);
  console.log();
  console.error("⚠️ Has the Firebase emulator been started?");
  console.log(
    "Run `pnpm emulator start` in a separate terminal before running `pnpm dev`",
  );
  console.log();
  process.exit(1);
});

const data = await res.json();
console.log(`🤖 Firebase emulator v${data.version} ready`);
