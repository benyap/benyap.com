# benyap.com

> ⚠️ This project is a work in progress.

My personal portfolio website. Built with [Next.js](https://nextjs.org),
[Turborepo](https://turborepo.org), [Tailwind](https://tailwindcss.com) and
[Radix UI](https://www.radix-ui.com).

## Local development

### Develop

To develop all apps and packages, run `yarn dev`.

To enable Firebase services for the `web` app, provide the stringifed Firebase config
through the `NEXT_PUBLIC_FIREBASE_CONFIG` variable in the file `apps/web/.env.local`.

### Build

To build all apps and packages, run `yarn build`.

## Release workflow

Releases should be created using [release-it](https://github.com/release-it/release-it)
on the `develop` branch.

1. Check out the `develop` branch
2. Run `yarn release`

Once a release has been created on GitHub, a pull request will be automatically created
to merge the release into `main`. Merging the pull request will trigger a deployment to
production on Vercel.

---

Copyright © 2022 [benyap](https://github.com/benyap)
