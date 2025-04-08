import { err, ok, Result } from "neverthrow";
import { DateTime } from "luxon";

import { Camera } from "~/core/camera";
import { Lens } from "~/core/lens";
import { ProcessedExifTags } from "~/core/photo/exif";
import { PhotoMetadata } from "~/core/photo";
import { Exception } from "~/lib/exception";

import { FileInfo } from "./info";

type WithId<T> = { id: string } & T;

type MissingMetadata = {
  field: keyof PhotoMetadata;
  suggestion?: string;
};

export class PhotoMetadataMissingException extends Exception.create(
  "photo-upload:metadata-missing",
) {
  constructor(
    message: string,
    readonly fileInfo: FileInfo,
    readonly missing: MissingMetadata[],
  ) {
    super(message);
  }
}

export function getPhotoMetadata(
  tags: ProcessedExifTags,
  {
    fileInfo,
    cameras,
    lenses,
    defaultZone,
  }: {
    fileInfo: FileInfo;
    cameras: WithId<Camera>[];
    lenses: WithId<Lens>[];
    defaultZone: string;
  },
): Result<PhotoMetadata, PhotoMetadataMissingException> {
  const date = getDate(tags, defaultZone);
  const camera = matchCamera(tags, cameras);
  const lens = matchLens(tags, lenses);
  const focalLength = getFocalLength(tags);
  const focalLengthIn35mmFilm = getFocalLengthIn35mmFilm(tags);
  const iso = getISO(tags);
  const fNumber = getFNumber(tags);
  const shutterSpeed = getShutterSpeed(tags);

  if (
    date.isErr() ||
    camera.isErr() ||
    lens.isErr() ||
    focalLength.isErr() ||
    focalLengthIn35mmFilm.isErr() ||
    iso.isErr() ||
    fNumber.isErr() ||
    shutterSpeed.isErr()
  ) {
    const missing: MissingMetadata[] = [
      date,
      camera,
      lens,
      focalLength,
      focalLengthIn35mmFilm,
      iso,
      fNumber,
      shutterSpeed,
    ]
      .filter((result) => result.isErr())
      .map((result) => result.error);

    return err(
      new PhotoMetadataMissingException(
        `Missing metadata: ${missing.map((m) => m.field).join(", ")}`,
        fileInfo,
        missing,
      ),
    );
  }

  return ok({
    source: fileInfo.fileType,
    date: date.value,
    cameraId: camera.value.id,
    lensId: lens.value.id,
    focalLength: focalLength.value,
    focalLengthIn35mmFilm: focalLengthIn35mmFilm.value,
    iso: iso.value,
    fNumber: fNumber.value,
    shutterSpeed: shutterSpeed.value,
  });
}

function getDate(
  tags: ProcessedExifTags,
  zone: string,
): Result<Date, MissingMetadata> {
  const { originalDate } = tags;
  if (!originalDate) return err({ field: "date" });
  return ok(DateTime.fromObject(originalDate, { zone }).toJSDate());
}

function matchCamera(
  tags: ProcessedExifTags,
  cameras: WithId<Camera>[],
): Result<WithId<Camera>, MissingMetadata> {
  const { camera } = tags;
  if (!camera.model) return err({ field: "cameraId" });
  const match = cameras.find((c) => c.exifTagMatches.includes(camera.model!));
  if (!match) return err({ field: "cameraId", suggestion: camera.model });
  return ok(match);
}

function matchLens(
  tags: ProcessedExifTags,
  lenses: WithId<Lens>[],
): Result<WithId<Lens>, MissingMetadata> {
  const { lens } = tags;
  if (!lens.model) return err({ field: "lensId" });
  const match = lenses.find((l) => l.exifTagMatches.includes(lens.model!));
  if (!match) return err({ field: "lensId", suggestion: lens.model });
  return ok(match);
}

function getFocalLength(
  tags: ProcessedExifTags,
): Result<string, MissingMetadata> {
  const { focalLength } = tags;
  if (!focalLength.value) return err({ field: "focalLength" });
  const [numerator, denominator] = focalLength.value;
  return ok(`${(numerator / denominator).toFixed()}`);
}

function getFocalLengthIn35mmFilm(
  tags: ProcessedExifTags,
): Result<string, MissingMetadata> {
  const { focalLengthIn35mmFilm } = tags;
  if (!focalLengthIn35mmFilm) return err({ field: "focalLengthIn35mmFilm" });
  return ok(`${focalLengthIn35mmFilm.toFixed()}`);
}

function getISO(tags: ProcessedExifTags): Result<string, MissingMetadata> {
  const { iso } = tags;
  if (!iso) return err({ field: "iso" });
  return ok(iso.toFixed());
}

function getFNumber(tags: ProcessedExifTags): Result<string, MissingMetadata> {
  const { fNumber } = tags;
  if (!fNumber.value) return err({ field: "fNumber" });
  const [numerator, denominator] = fNumber.value;
  return ok(`${(numerator / denominator).toFixed(1)}`);
}

function getShutterSpeed(
  tags: ProcessedExifTags,
): Result<string, MissingMetadata> {
  const { exposureTime } = tags;
  if (!exposureTime.value) return err({ field: "shutterSpeed" });
  const [numerator, denominator] = exposureTime.value;
  return ok(`${numerator}/${denominator}`);
}
