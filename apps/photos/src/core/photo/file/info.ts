import { err, ok, Result } from "neverthrow";

import { PhotoFileType } from "~/core/photo";
import { Exception } from "~/lib/exception";

import { mimeTypeToFormat, mimeTypeToPhotoFileType } from "./mime";

export type FileInfo = {
  file: File;
  fileId: string;
  fileType: PhotoFileType;
  format: string;
};

export class BadPhotoFileException extends Exception.create(
  "photo-upload:bad-file",
) {
  constructor(
    message: string,
    readonly fileInfo: Omit<FileInfo, "fileType" | "format"> & {
      fileType: PhotoFileType | null;
      format: string | null;
    },
  ) {
    super(message);
  }
}

export function getFileInfo(
  file: File,
): Result<FileInfo, BadPhotoFileException> {
  const format = mimeTypeToFormat(file.type);
  const fileType = mimeTypeToPhotoFileType(file.type);
  const fileId = file.name.replace(/\.[^/.]+$/, "");

  if (!fileType || !format) {
    return err(
      new BadPhotoFileException("Bad file type or format", {
        file,
        fileId,
        fileType,
        format,
      }),
    );
  }

  return ok({ file, fileId, fileType, format });
}
