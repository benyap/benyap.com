import { z } from "zod";

export const LocationSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["place", "city", "suburb", "state", "country"]),
});
