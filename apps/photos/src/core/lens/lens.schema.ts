import { z } from "zod";

export type Lens = z.infer<typeof LensSchema>;

export const LensSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  exifTagMatches: z.string().array(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});
