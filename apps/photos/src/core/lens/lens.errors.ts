import { Exception } from "~/lib/exception";

export class LensCreateFailedException extends Exception.create(
  "lens:create-failed",
) {}

export class LensUpdateFailedException extends Exception.create(
  "lens:update-failed",
) {}

export class LensDeleteFailedException extends Exception.create(
  "lens:delete-failed",
) {}
