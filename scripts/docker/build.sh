#!/bin/bash

# Forces script to exit on error
set -e

if [ -z "$IMAGE" ]; then
  echo "Variable IMAGE is required"
  exit 1
fi

if [ -z "$APP" ]; then
  echo "Variable APP is required"
  exit 1
fi

if ! which jq &> /dev/null; then
  echo "Please install jq with \`brew install jq\`"
  exit 1
fi

VERSION=$(jq -r ".version" package.json)
COMMIT_HASH="$(git rev-parse --short HEAD)"
BUILD_ID="local"

ARGS=()
ARGS+=("--build-arg" "APP=$APP")
ARGS+=("--build-arg" "VERSION=$VERSION")
ARGS+=("--build-arg" "COMMIT_HASH=$COMMIT_HASH")
ARGS+=("--build-arg" "BUILD_ID=$BUILD_ID")

ENV_FILE_DEV="apps/$APP/.env.development"

# Read any additional variables in .env.development
if [ -f "$ENV_FILE_DEV" ]; then
  while IFS= read -r line; do
    # Skip empty lines
    if [ -z "$line" ]; then
        continue
    fi

    # Skip lines starting with "#"
    if [[ $line == \#* ]]; then
        continue
    fi

    ARGS+=("--build-arg" "$line")
  done < "$ENV_FILE_DEV"
fi

if [ -n "$NO_CACHE" ]; then
  ARGS+=("--no-cache")
fi

if [ -n "$DEBUG" ]; then
  ARGS+=("--progress=plain")
fi

echo "Building image $IMAGE"
docker build -t "$IMAGE" "${ARGS[@]}" .

echo "Removing build stage images"
docker image prune --force --filter label=stage=base
docker image prune --force --filter label=stage=build
