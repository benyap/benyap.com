import { z } from "zod";

export const LensSchema = z.object({
  id: z.string(),
  name: z.string(),
  matches: z.string().array(),
});
