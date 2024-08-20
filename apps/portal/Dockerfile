FROM node:20-slim AS base
LABEL stage=base

# ---

FROM base AS dependencies
LABEL stage=dependencies
WORKDIR /app

ARG CI=true

COPY . .
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# ---

FROM base AS builder
LABEL stage=builder
WORKDIR /app

COPY --from=dependencies /app .

# Environment variables required for .env
ARG APP
ARG VERSION=$VERSION
ARG COMMIT_HASH=$COMMIT_HASH
ARG BUILD_ID=$BUILD_ID
ARG GCP_PROJECT=$GCP_PROJECT
ARG NEXT_PUBLIC_FIREBASE_CONFIG=$NEXT_PUBLIC_FIREBASE_CONFIG
# docker - HYGEN INJECTION POINT (do not remove comment)

RUN corepack enable pnpm && pnpm build --filter $APP

# ---

FROM base AS runner
LABEL stage=runner
WORKDIR /app

ARG APP
ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/$APP/public ./apps/$APP/public

# Set the correct permission for prerender cache
RUN mkdir -p ./apps/$APP/.next
RUN chown nextjs:nodejs ./apps/$APP/.next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/$APP/.next/standalone .
COPY --from=builder --chown=nextjs:nodejs /app/apps/$APP/.next/static ./apps/$APP/.next/static

RUN cat apps/$APP/.env

USER nextjs

EXPOSE ${PORT}

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
WORKDIR /app/apps/$APP
CMD node server.js
