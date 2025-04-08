import { PHOTO_MIME_TYPES } from "./mime";

function isAcceptedPhotoMimeType(file: File): boolean {
  return PHOTO_MIME_TYPES.includes(file.type);
}

const TIFF_MAGIC_BYTES = [0x49, 0x49, 0x2a, 0x00];

/**
 * Check the first 4 bytes of a file to determine if it contains the
 * magic bytes used in TIFF-base raw files produced by Sony cameras.
 */
async function isSonyARWFile(file: File): Promise<boolean> {
  const blob = file.slice(0, 4);
  const buffer = await blob.arrayBuffer();
  return new Uint8Array(buffer).every((b, i) => TIFF_MAGIC_BYTES[i] === b);
}

/**
 * Checks if the given file is a supported photo file type.
 */
export async function isSupportedPhotoFileType(file: File): Promise<boolean> {
  if (isAcceptedPhotoMimeType(file)) return true;
  if (await isSonyARWFile(file)) return true;
  return false;
}
