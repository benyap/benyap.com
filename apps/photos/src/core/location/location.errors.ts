import { Exception } from "~/lib/exception";

export class LocationCreateFailedException extends Exception.create(
  "location:create-failed",
) {}

export class LocationUpdateFailedException extends Exception.create(
  "location:update-failed",
) {}

export class LocationDeleteFailedException extends Exception.create(
  "location:delete-failed",
) {}
