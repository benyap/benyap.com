#!/bin/bash

# Create a .env file with the expected environment variables
# Next.js requires the .env file to be present during the build

# ASSUMPTION: environment variables defined in `.env.development`
# are also used for a production build.

RESERVED_VARIABLES=("APP" "VERSION" "BUILD_ID" "COMMIT_HASH")

is_reserved() {
  local string="$1"
  for element in "${RESERVED_VARIABLES[@]}"; do
    if [[ "$element" == "$string" ]]; then
      return 0 # match found
    fi
  done
  return 1  # No match found
}

VARIABLES=("APP" "VERSION" "BUILD_ID" "COMMIT_HASH")
ENV_FILE_DEV=".env.development"
ENV_FILE=".env"

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

    # Split the string by "=" and take the first part
    name=$(echo "$line" | cut -d'=' -f1)

    # Skip any values that are reserved
    if is_reserved "$name"; then
      echo "WARNING: skipping $name in $ENV_FILE_DEV as it is reserved"
      continue
    fi

    # Add the variable name to the list
    VARIABLES+=("$name")
  done < "$ENV_FILE_DEV"
fi

echo
echo "Injecting variables into $ENV_FILE"
echo "# autogenerated $ENV_FILE file" > $ENV_FILE

# Grab each variable from the current environment and write it into .env
for variable in "${VARIABLES[@]}"; do
  echo "$variable=${!variable}"
  echo "$variable=${!variable}" >> $ENV_FILE
done
echo
