# Firebase Emulator

This directory contains scripts for running the Firebase emulator for local
development.

These scripts can be run from the root of the project (exposed via the
`emulator` script in the root `package.json`).

## Start the emulator

```bash
pnpm emulator start
```

Use `CTRL+C` to stop the emulator and save the current state to the
`firebase/emulator/data` directory.

## Reset emulator data

When the emulator is not running, run this script to delete any local emulator
data.

```bash
pnpm emulator reset
```

## Clean up emulator log files

```bash
pnpm emulator clean
```
