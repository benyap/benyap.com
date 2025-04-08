import type {
  ExifTags as ExifReaderExifTags,
  Tags as ExifReaderTags,
} from "exifreader";
import type { ExifDir } from "sharp";
import { DateTime } from "luxon";

import {
  ProcessedExifTags,
  IntegerSchema,
  IntegerTagSchema,
  RationalTagSchema,
} from "./exif.schema";
import { getExifTagValue } from "./utils";

function parseInteger(value: unknown) {
  const parsed = IntegerSchema.safeParse(value);
  return parsed.success ? parsed.data : undefined;
}

function parseRationalTag(value: unknown) {
  const parsed = RationalTagSchema.safeParse(value);
  return parsed.success ? parsed.data : {};
}

function parseIntegerTag(value: unknown) {
  const parsed = IntegerTagSchema.safeParse(value);
  return parsed.success ? parsed.data : {};
}

function parseDateTimeOriginalTag(tags: ExifReaderTags) {
  const dateTimeOriginalTag = tags.DateTimeOriginal?.description ?? "";
  const date = DateTime.fromFormat(dateTimeOriginalTag, "yyyy:MM:dd HH:mm:ss");
  if (date.isValid) return date;
  return null;
}

/**
 * Process the useful EXIF tags parsed by the `exifreader` library
 *
 * @param tags The EXIF tags extracted by `exifreader`.
 */
export function getProcessedExifTags(tags: ExifReaderTags): ProcessedExifTags {
  const originalDate = parseDateTimeOriginalTag(tags) ?? undefined;
  return {
    camera: {
      make: tags.Make?.description,
      model: tags.Model?.description,
    },
    lens: {
      make: tags.LensMake?.description,
      model: tags.LensModel?.description,
      maxApertureValue: parseRationalTag(tags.MaxApertureValue),
    },
    originalDate: originalDate?.toObject(),
    focalLength: parseRationalTag(tags.FocalLength),
    focalLengthIn35mmFilm: parseInteger(tags.FocalLengthIn35mmFilm?.value),
    iso: parseInteger(tags.ISOSpeedRatings?.value),
    fNumber: parseRationalTag(tags.FNumber),
    exposureTime: parseRationalTag(tags.ExposureTime),
    exposureBias: parseRationalTag(tags.ExposureBiasValue),
    exposureMode: parseIntegerTag(tags.ExposureMode),
    meteringMode: parseIntegerTag(tags.MeteringMode),
    flash: parseIntegerTag(tags.Flash),
    whiteBalance: parseIntegerTag(tags.WhiteBalance),
  };
}

function createExifDirEntry<TKey extends keyof ExifReaderExifTags>(
  tags: ExifReaderExifTags,
  key: TKey,
  options: { defaultValue?: string | null; overrideValue?: string | null } = {},
) {
  const { defaultValue, overrideValue } = options;

  if (overrideValue) return { [key]: overrideValue };

  const tag = tags[key];
  if (!tag) return null;

  const value = getExifTagValue(tag);
  if (value) return { [key]: value };

  if (defaultValue) return { [key]: defaultValue };

  return null;
}

/**
 * Collect the necessary EXIF data and prepare it for embedding
 * it within an image using `sharp`.
 *
 * @param tags The EXIF tags extracted from a photo.
 */
export function getExifForSharp(tags: ExifReaderExifTags) {
  const dateCreated = "DateCreated" in tags ? tags["DateCreated"] : null;

  const IFD0: ExifDir = {
    ...createExifDirEntry(tags, "Make"),
    ...createExifDirEntry(tags, "Model"),
    ...createExifDirEntry(tags, "Orientation"),
    ...createExifDirEntry(tags, "UserComment", {
      // Set DateCreated (which contains the timezone) in the UserComment field
      overrideValue: getExifTagValue(dateCreated),
    }),
  };

  const IFD2: ExifDir = {
    ...createExifDirEntry(tags, "DateTimeOriginal"),
    ...createExifDirEntry(tags, "ISOSpeedRatings"),
    ...createExifDirEntry(tags, "FNumber"),
    ...createExifDirEntry(tags, "ExposureTime"),
    ...createExifDirEntry(tags, "Flash"),
    ...createExifDirEntry(tags, "WhiteBalance"),
    ...createExifDirEntry(tags, "LensMake"),
    ...createExifDirEntry(tags, "LensModel"),
    ...createExifDirEntry(tags, "MaxApertureValue"),
    ...createExifDirEntry(tags, "FocalLength"),
    ...createExifDirEntry(tags, "FocalLengthIn35mmFilm"),
  };

  return { IFD0, IFD2 };
}
