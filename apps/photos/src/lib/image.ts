import { err, fromPromise, fromSafePromise, ok, ResultAsync } from "neverthrow";

import { Exception } from "~/lib/exception";
import { Thumbhash } from "~/lib/thumbhash";

export class BitmapImageCreationFailedException extends Exception.create(
  "image:bitmap-image-creation-failed",
) {}

export class CanvasNotAvailableException extends Exception.create(
  "image:canvas-not-available",
) {}

export class ToBlobFailedException extends Exception.create(
  "image:to-blob-failed",
) {}

export type DrawingContext = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
};

/**
 * Draw an image file to a canvas, where it can be
 * transformed into other representations.
 */
export function drawImageFile(
  file: File,
  options: { maxSize: number },
): ResultAsync<
  DrawingContext,
  BitmapImageCreationFailedException | CanvasNotAvailableException
> {
  const { maxSize } = options;
  return fromPromise(
    createImageBitmap(file),
    (cause) =>
      new BitmapImageCreationFailedException(
        `Failed to create bitmap image from file ${file.name}`,
        cause,
      ),
  ).andThen((bitmap) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return err(new CanvasNotAvailableException());

    const scale = Math.min(maxSize / bitmap.width, maxSize / bitmap.height, 1);
    canvas.width = bitmap.width * scale;
    canvas.height = bitmap.height * scale;

    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    return ok({ canvas, context });
  });
}

/**
 * Returns a data URL for the given image file.
 */
export function imageFileToObjectURL(
  file: File,
  options: { maxSize: number; quality: number },
): ResultAsync<string, never> {
  const { maxSize, quality } = options;
  return fromSafePromise(
    new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = async () => {
        await drawImageFile(file, { maxSize })
          .andThen(({ canvas }) => canvasToBlob(canvas, { quality }))
          .map((blob) => {
            const imageUrl = URL.createObjectURL(blob!);
            resolve(imageUrl);
          });
      };

      reader.readAsDataURL(file);
    }),
  );
}

/**
 * Convert a {@link HTMLCanvasElement canvas} drawing to a {@link Blob}.
 */
export function canvasToBlob(
  canvas: HTMLCanvasElement,
  options: {
    type?: string;
    quality?: number;
  } = {},
): ResultAsync<Blob, ToBlobFailedException> {
  const { type = "image/jpeg", quality = 0.8 } = options;
  return fromPromise(
    new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject();
        },
        type,
        quality,
      );
    }),
    () => new ToBlobFailedException("Failed to convert canvas to blob"),
  );
}

/**
 * Converts a drawing context into a Thumbhash (binary).
 */
export function drawingToThumbhash(
  drawing: DrawingContext,
): Uint8Array<ArrayBufferLike> {
  const { canvas, context } = drawing;
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
  return Thumbhash.rgbaToThumbHash(pixels.width, pixels.height, pixels.data);
}

/**
 * Converts a Thumbhash (binary) to a base64 string.
 */
export function thumbhashToBase64(
  thumbhash: Uint8Array<ArrayBufferLike>,
): string {
  return btoa(String.fromCharCode(...thumbhash));
}
