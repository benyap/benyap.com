import { z } from "zod";

export const PhotoGenericTagSchema = z.object({
  id: z.string(),
  type: z.literal("tag"),
  value: z.string(),
});

export const PhotoLocationTagSchema = z.object({
  id: z.string(),
  type: z.literal("location"),
  value: z.string(),
});

export const PhotoCollectionTagSchema = z.object({
  id: z.string(),
  type: z.literal("collection"),
  value: z.string(),
});
