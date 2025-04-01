import { z } from "zod";

import {
  IntegerSchema,
  PhotoExifTagsSchema,
  RationalSchema,
} from "~/photo/exif/schema";

const PhotoPropertiesSchema = z.object({
  date: z.date(),
  camera: z.string(),
  lens: z.string(),
  focalLength: IntegerSchema,
  focalLengthIn35mmFilm: IntegerSchema,
  iso: IntegerSchema,
  fNumber: z.number(),
  shutterSpeed: RationalSchema,
});

export const PhotoSchema = z.object({
  id: z.string(),
  uploadedAt: z.date(),
  title: z.string().optional(),
  description: z.string().optional(),
  sharedWith: z.string().array(),
  collections: z.string().array(),
  locations: z.string().array(),
  tags: z.string().array(),
  thumbhash: z.string(),
  properties: PhotoPropertiesSchema,
  exif: PhotoExifTagsSchema,
});

export type Photo = z.infer<typeof PhotoSchema>;
