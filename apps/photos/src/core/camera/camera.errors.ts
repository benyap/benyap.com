import { Exception } from "~/lib/exception";

export class CameraCreateFailedException extends Exception.create(
  "camera:create-failed",
) {}

export class CameraUpdateFailedException extends Exception.create(
  "camera:update-failed",
) {}

export class CameraDeleteFailedException extends Exception.create(
  "camera:delete-failed",
) {}
