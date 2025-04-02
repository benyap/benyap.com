import { z } from "zod";

export const CameraSchema = z.object({
  id: z.string(),
  name: z.string(),
  matches: z.string().array(),
});
