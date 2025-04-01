import type { ExifDir } from "sharp";

import { getExifTagValue } from "./utils";

import type { ExifTags } from "./utils";

function createExifEntry<TKey extends keyof ExifTags>(
  tags: ExifTags,
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
export function getExifForSharp(tags: ExifTags) {
  const dateCreated = "DateCreated" in tags ? tags["DateCreated"] : null;

  const IFD0: ExifDir = {
    ...createExifEntry(tags, "Make"),
    ...createExifEntry(tags, "Model"),
    ...createExifEntry(tags, "Orientation"),
    ...createExifEntry(tags, "UserComment", {
      // Set DateCreated (which contains the timezone) in the UserComment field
      overrideValue: getExifTagValue(dateCreated),
    }),
  };

  const IFD2: ExifDir = {
    ...createExifEntry(tags, "DateTimeOriginal"),
    ...createExifEntry(tags, "ISOSpeedRatings"),
    ...createExifEntry(tags, "FNumber"),
    ...createExifEntry(tags, "ExposureTime"),
    ...createExifEntry(tags, "Flash"),
    ...createExifEntry(tags, "WhiteBalance"),
    ...createExifEntry(tags, "LensMake"),
    ...createExifEntry(tags, "LensModel"),
    ...createExifEntry(tags, "MaxApertureValue"),
    ...createExifEntry(tags, "FocalLength"),
    ...createExifEntry(tags, "FocalLengthIn35mmFilm"),
  };

  return { IFD0, IFD2 };
}
