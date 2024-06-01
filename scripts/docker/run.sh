#!/bin/bash

# Forces script to exit on error
set -e

if [ -z "$CONTAINER" ]; then
  echo "Variable CONTAINER is required"
  exit 1
fi

if [ -z "$IMAGE" ]; then
  echo "Variable IMAGE is required"
  exit 1
fi

if [ -z "$PORT" ]; then
  echo "Variable PORT is required"
  exit 1
fi

# Check if the container is already running
# shellcheck disable=SC2086
if [ "$(docker ps -q -f name=^$CONTAINER$)" ]; then
  echo "Container $CONTAINER is already running."
  exit 0
fi

# If the container is not running, check if it has exited
# shellcheck disable=SC2086
if [ "$(docker ps -qa -f status=exited -f name=^$CONTAINER$)" ]; then
  # If it has exited, start it up again
  echo "Starting existing container: $CONTAINER"
  docker start "$CONTAINER"
  exit 0
fi

# Start the container for the first time
echo "Starting container $CONTAINER..."
docker run \
  --name "$CONTAINER" \
  --publish "$PORT:$PORT" \
  --volume ~/.config/gcloud:/root/.config/gcloud \
  --interactive \
  --tty \
  --rm \
  "$IMAGE"

exit 0
