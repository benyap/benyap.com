import { z } from "zod";

export const PhotoFileTypeSchema = z.enum(["raw", "processed", "optimized"]);

export type PhotoFileType = z.infer<typeof PhotoFileTypeSchema>;

export const PhotoMetadataSchema = z.object({
  source: PhotoFileTypeSchema,
  date: z.date(),
  cameraId: z.string(),
  lensId: z.string(),
  focalLength: z.string(),
  focalLengthIn35mmFilm: z.string(),
  iso: z.string(),
  fNumber: z.string(),
  shutterSpeed: z.string(),
});

export type PhotoMetadata = z.infer<typeof PhotoMetadataSchema>;

export const PhotoFileSchema = z.object({
  id: z.string(),
  format: z.string(),
  description: z.string().optional(),
  size: z.number(),
  path: z.string(),
  file: z.instanceof(File).optional(),
});

export const PhotoSchema = z.object({
  reference: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  thumbhash: z.string().optional(),
  collections: z.string().array(),
  locations: z.string().array(),
  tags: z.string().array(),
  metadata: PhotoMetadataSchema,
  files: z.record(PhotoFileTypeSchema, PhotoFileSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Photo = z.infer<typeof PhotoSchema>;
