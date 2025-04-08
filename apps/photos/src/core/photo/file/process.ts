import { DateTime } from "luxon";
import { fromPromise, fromSafePromise, ResultAsync } from "neverthrow";
import ExifReader from "exifreader";

import {
  drawImageFile,
  drawingToThumbhash,
  thumbhashToBase64,
} from "~/lib/image";
import { Exception } from "~/lib/exception";
import { generatePhotoId, Photo } from "~/core/photo";
import { getProcessedExifTags } from "~/core/photo/exif";
import { Camera } from "~/core/camera";
import { Lens } from "~/core/lens";

import { BadPhotoFileException, FileInfo, getFileInfo } from "./info";
import { getPhotoMetadata, PhotoMetadataMissingException } from "./metadata";

export class PhotoExifReadException extends Exception.create(
  "photo-upload:exif-read-failed",
) {
  constructor(
    message: string,
    readonly fileInfo: FileInfo,
    cause: unknown,
  ) {
    super(message, cause);
  }
}

export type PhotoUploadException =
  | BadPhotoFileException
  | PhotoExifReadException
  | PhotoMetadataMissingException;

export function preparePhotoFilesForUpload(
  files: File[],
  {
    cameras,
    lenses,
  }: {
    cameras: (Camera & { id: string })[];
    lenses: (Lens & { id: string })[];
  },
): ResultAsync<
  {
    photos: Photo[];
    errors: PhotoUploadException[];
  },
  never
> {
  const photoInfo = files.map((file) =>
    getFileInfo(file).asyncAndThen((fileInfo) =>
      fromPromise(
        ExifReader.load(fileInfo.file).then((tags) => ({
          ...fileInfo,
          tags: getProcessedExifTags(tags),
        })),
        (error) =>
          new PhotoExifReadException(
            "Failed to read EXIF data",
            fileInfo,
            error,
          ),
      ).andThen(({ tags, ...fileInfo }) => {
        const metadata = getPhotoMetadata(tags, {
          fileInfo,
          cameras,
          lenses,
          defaultZone: DateTime.local().zoneName,
        });
        return metadata.map((metadata) => ({ ...fileInfo, metadata }));
      }),
    ),
  );

  return fromSafePromise(Promise.all(photoInfo)).andThen((results) => {
    const photoFiles = results
      .filter((result) => result.isOk())
      .map((result) => result.value);

    const errors: PhotoUploadException[] = results
      .filter((result) => result.isErr())
      .map((result) => result.error);

    const photos: Record<string, Photo> = {};

    for (const { file, fileId, fileType, format, metadata } of photoFiles) {
      const path = generatePhotoId();

      if (!photos[fileId]) {
        photos[fileId] = {
          reference: fileId,
          collections: [],
          locations: [],
          tags: [],
          metadata,
          files: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }

      photos[fileId].files[fileType] = {
        id: `${fileId}-${format}`,
        format,
        size: file.size,
        path,
        file,
      };
    }

    return fromSafePromise(
      Promise.all(
        Object.values(photos).map(async (photo) => {
          // Generate thumbhash photos where the JPG is available
          const imageFile = photo.files.processed?.file;
          if (imageFile) {
            const hash = await drawImageFile(imageFile, { maxSize: 100 })
              .map(drawingToThumbhash)
              .map(thumbhashToBase64);
            if (hash.isOk()) photo.thumbhash = hash.value;
          }
          return photo;
        }),
      ),
    ).map((photos) => ({ photos, errors }));
  });
}
