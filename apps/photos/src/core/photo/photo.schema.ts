import { z } from "zod";

export const PhotoMetadataSchema = z.object({
  date: z.date(),
  camera: z.string(),
  lens: z.string(),
  focalLength: z.string(),
  focalLengthIn35mmFilm: z.string(),
  iso: z.string(),
  fNumber: z.string(),
  shutterSpeed: z.string(),
});

export const PhotoFileSchema = z.object({
  id: z.string(),
  type: z.enum(["processed", "raw"]),
  format: z.string(),
  description: z.string().optional(),
  size: z.number(),
  path: z.string(),
});

export const PhotoSchema = z.object({
  id: z.string(),
  uploadedAt: z.date(),
  title: z.string().optional(),
  description: z.string().optional(),
  thumbhash: z.string(),
  collections: z.string().array(),
  locations: z.string().array(),
  tags: z.string().array(),
  metadata: PhotoMetadataSchema,
  files: PhotoFileSchema.array(),
  primaryFileId: z.string(),
});
