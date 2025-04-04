import { z } from "zod";

export const TagSchema = z.object({
  id: z.string(),
  value: z.string(),
});
