import { customAlphabet } from "nanoid";

export const generatePhotoId = customAlphabet("abcdefghijklmnopqrstuvwxyz", 16);
