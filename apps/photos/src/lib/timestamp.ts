import { z } from "zod";
import { Timestamp } from "firebase/firestore";

export const TimestampToDate = z
  .unknown()
  .transform((value) => (value instanceof Timestamp ? value : null))
  .transform((t) => t?.toDate() ?? null);
