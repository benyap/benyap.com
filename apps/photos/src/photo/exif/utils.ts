import { z } from "zod";
import ExifReader from "exifreader";

import type { Tags } from "exifreader";

import { IntegerTagSchema, RationalTagSchema, StringTagSchema } from "./schema";

export type ExifTags = Tags;

/**
 * Read EXIF tags from a photo that has been loaded as a buffer.
 */
export function readExifTags(photo: Buffer): ExifTags {
  return ExifReader.load(photo);
}

const StringTagValueSchema = StringTagSchema.pick({ value: true }).required();

function hasStringValue(
  tag: unknown,
): tag is z.infer<typeof StringTagValueSchema> {
  return StringTagValueSchema.safeParse(tag).success;
}

const IntegerTagValueSchema = IntegerTagSchema.pick({ value: true }).required();

function hasNumberValue(
  tag: unknown,
): tag is z.infer<typeof IntegerTagValueSchema> {
  return IntegerTagValueSchema.safeParse(tag).success;
}

const RationalTagValueSchema = RationalTagSchema.pick({
  value: true,
}).required();

function hasRationalValue(
  tag: unknown,
): tag is z.infer<typeof RationalTagValueSchema> {
  return RationalTagValueSchema.safeParse(tag).success;
}

const TagDescriptionSchema = StringTagSchema.pick({
  description: true,
}).required();

function hasDescription(
  tag: unknown,
): tag is z.infer<typeof TagDescriptionSchema> {
  return TagDescriptionSchema.safeParse(tag).success;
}

/**
 * Get the most useful value out of an EXIF tag parsed by {@link ExifReader}.
 */
export function getExifTagValue(tag: unknown): string | null {
  if (!tag) return null;

  if (hasStringValue(tag)) {
    return tag.value.toString();
  }

  if (hasNumberValue(tag)) {
    return tag.value.toString();
  }

  if (hasRationalValue(tag)) {
    const [first, second] = tag.value;
    return `${first}/${second}`;
  }

  if (hasDescription(tag)) {
    return tag.description;
  }

  return null;
}
