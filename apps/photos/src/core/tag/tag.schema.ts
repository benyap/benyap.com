import { z } from "zod";

export type Tag = z.infer<typeof TagSchema>;

export const TagSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});
