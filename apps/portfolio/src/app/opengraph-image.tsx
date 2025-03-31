import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { SITE_NAME } from "~/constants/metadata";

import { OGImage } from "~/components/core/OGImage";

// Image metadata
export const contentType = "image/png";
export const alt = SITE_NAME;
export const size = {
  width: 1200,
  height: 630,
};

// Image generation
export default async function Image() {
  const OutfitBold = await readFile(
    join(process.cwd(), "assets/fonts/Outfit-Bold.ttf"),
  );

  return new ImageResponse(<OGImage />, {
    ...size,
    fonts: [
      {
        name: "Outfit",
        data: OutfitBold,
        style: "normal",
        weight: 600,
      },
    ],
  });
}
