import { Exception } from "~/lib/exception";

export class TagCreateFailedException extends Exception.create(
  "tag:create-failed",
) {}

export class TagUpdateFailedException extends Exception.create(
  "tag:update-failed",
) {}

export class TagDeleteFailedException extends Exception.create(
  "tag:delete-failed",
) {}
