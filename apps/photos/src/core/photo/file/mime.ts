import { Accept } from "react-dropzone";

import { PhotoFileType } from "~/core/photo/photo.schema";

export const PhotoMimeType = {
  ARW_SONY: "image/x-sony-arw",
  JPEG: "image/jpeg",
};

export const PhotoFileFormat = {
  RAW: "RAW",
  JPEG: "JPEG",
};

export const PHOTO_MIME_TYPES = Object.values(PhotoMimeType);

export const PHOTO_MIME_TYPES_ACCEPT = mimeTypesToAccept(PHOTO_MIME_TYPES);

function mimeTypesToAccept(mimeTypes: string[]): Accept {
  return mimeTypes.reduce<Accept>((accept, mime) => {
    accept[mime] = [];
    return accept;
  }, {});
}

/**
 * Maps a mime type to a {@link PhotoFileType}. Returns `null` if not recognised.
 */
export function mimeTypeToPhotoFileType(
  mimeType: string | undefined,
): PhotoFileType | null {
  switch (mimeType) {
    case PhotoMimeType.JPEG:
      return "processed";
    case PhotoMimeType.ARW_SONY:
      return "raw";
    default:
      return null;
  }
}

/**
 * Maps a mime type to a human-friendly format name. Returns `null` if not recognised.
 */
export function mimeTypeToFormat(mimeType: string | undefined): string | null {
  switch (mimeType) {
    case PhotoMimeType.JPEG:
      return PhotoFileFormat.JPEG;
    case PhotoMimeType.ARW_SONY:
      return PhotoFileFormat.RAW;
    default:
      return null;
  }
}
