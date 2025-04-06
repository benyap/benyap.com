import { z } from "zod";

export const LocationSchema = z.object({
  name: z.string(),
  type: z.enum(["place", "city", "suburb", "state", "country"]),
  description: z.string().optional(),
  relatedTo: z.string().array(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export type Location = z.infer<typeof LocationSchema>;
