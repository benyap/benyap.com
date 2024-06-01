#!/bin/bash

# Forces script to exit on error
set -e

if [ -z "$CONTAINER" ]; then
  echo "Variable CONTAINER is required"
  exit 1
fi

# Kill container if it is running
# shellcheck disable=SC2086
if [ "$(docker ps -q -f name=^$CONTAINER$)" ]; then
  echo "Killing container $CONTAINER"
  docker kill "$CONTAINER"
fi

# Remove the container
# shellcheck disable=SC2086
if [ "$(docker ps -qa -f status=exited -f name=^$CONTAINER$)" ]; then
  echo "Removing container $CONTAINER"
  docker rm "$CONTAINER"
fi

# If no IMAGE flag is given, exit
if [ -z "$IMAGE" ]; then
  exit 0
fi

# Remove image
# shellcheck disable=SC2086
if [ "$(docker images -q -f reference=$IMAGE)" ]; then
  echo "Removing image $IMAGE"
  docker rmi "$IMAGE"
fi
