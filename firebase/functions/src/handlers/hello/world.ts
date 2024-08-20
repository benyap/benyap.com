import { onRequest } from "firebase-functions/v2/https";

export const world = onRequest({ cors: true }, (_, res) => {
  res.json({ message: "Hello World!" });
});
