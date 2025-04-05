import { z } from "zod";

export type Camera = z.infer<typeof CameraSchema>;

export const CameraSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
  exifTagMatches: z.string().array(),
});
