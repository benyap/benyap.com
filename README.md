# benyap.com

My personal website.

## Quick start

### Prerequisites

#### Software

Ensure that you have the following software on your system:

- [Node.js](https://nodejs.org/en/) (v22.x)
- [pnpm](https://pnpm.io/) (v10.x)

Clone this repository and install dependencies with `pnpm`.

```bash
pnpm install
```

#### Environment variables

For sites that are deployed to Vercel, environment variables can be pulled from
the respective project on Vercel using the
[Vercel CLI](https://vercel.com/docs/environment-variables#development-environment-variables).
To do this:

1. Navigate to the project directory.

   ```bash
   cd apps/portfolio
   ```

2. Link the project (this is only required once).

   ```bash
   pnpm vercel link
   ```

3. Pull the development secrets into a `.env.local` file.

   ```bash
   pnpm vercel env pull
   ```

The `.env.local` file should **not** be committed to version control. You can
run `pnpm vercel env pull` whenever the environment variables need to be
updated.

### Running the application locally

1. Start the Firebase emulator.

   ```bash
   pnpm emulator start
   ```

2. In a separate terminal, start the development server.

   ```bash
   pnpm dev
   ```

3. Access the apps on the following URL for local development:

   | App       | Route                                          |
   | --------- | ---------------------------------------------- |
   | portfolio | [http://localhost:3000](http://localhost:3000) |

---

Copyright © 2025 [benyap](https://github.com/benyap).
