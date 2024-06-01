FROM node:20-slim AS base
LABEL stage=base

ARG APP=$APP
LABEL app=benyap-$APP

WORKDIR /usr/app

FROM base AS build
LABEL stage=build

# ---
# Environment variables required for .env
# ---

ARG APP=$APP
ARG VERSION=$VERSION
ARG COMMIT_HASH=$COMMIT_HASH
ARG BUILD_ID=$BUILD_ID
# docker - HYGEN INJECTION POINT (do not remove comment)

# ---

# Copy source code
COPY . .

# Set build args
ARG CI=true
ARG PNPM_VERSION=9.1.4

# Install and build
RUN npm install -g pnpm@$PNPM_VERSION
RUN pnpm install
RUN pnpm build --filter $APP

# Create a clean container for the final image
FROM base AS app
LABEL stage=app

ARG APP=$APP
ENV NODE_ENV=production
ENV PORT=3000

# Copy assets into container
COPY --from=build /usr/app/apps/$APP/.next apps/$APP/.next
COPY --from=build /usr/app/apps/$APP/.env apps/$APP/.env

# Copy production dependency manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/$APP/package.json apps/$APP/package.json

# Install production dependencies
ARG CI=true
COPY config config
COPY scripts scripts
RUN npm install -g pnpm@$PNPM_VERSION
RUN pnpm install --prod

EXPOSE $PORT

WORKDIR /usr/app/apps/$APP
CMD npm start
