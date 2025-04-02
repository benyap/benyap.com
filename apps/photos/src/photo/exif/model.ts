import type { Tags } from "exifreader";

import { IntegerSchema, IntegerTagSchema, RationalTagSchema } from "./schema";

import type { PhotoExifTags } from "./schema";

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

function getNonExifTag(key: string, tags: Tags) {
  return key in tags ? tags[key] : null;
}

/**
 * Collect the necessary EXIF data and return in a format
 * ready for saving to the database.
 *
 * @param tags The EXIF tags extracted from a photo.
 */
export function getExifForModel(tags: Tags): PhotoExifTags {
  const dateCreatedTag = getNonExifTag("DateCreated", tags);
  const originalDate = new Date(String(dateCreatedTag?.value));
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
    originalDate: isNaN(originalDate.getTime()) ? undefined : originalDate,
    focalLength: parseRationalTag(tags.FocalLength),
    focalLengthIn35mmFilm: parseInteger(tags.FocalLengthIn35mmFilm?.value),
    iso: parseInteger(tags.ISOSpeedRatings?.value),
    fNumber: parseRationalTag(tags.ExposureTime),
    exposureTime: parseRationalTag(tags.ExposureTime),
    exposureBias: parseRationalTag(tags.ExposureBiasValue),
    exposureMode: parseIntegerTag(tags.ExposureMode),
    meteringMode: parseIntegerTag(tags.MeteringMode),
    flash: parseIntegerTag(tags.Flash),
    whiteBalance: parseIntegerTag(tags.WhiteBalance),
  };
}
