import { useCallback, useEffect, useMemo, useState } from "react";

import { imageFileToObjectURL } from "~/lib/image";

const PREVIEW_MIME_TYPES = ["image/jpeg"];

/**
 * Generates an image preview using {@link https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static createObjectURL}
 * for the given image file. The image is returned as a URL
 * that can be loaded using an `img` tag.
 *
 * Once the image has been loaded, it should be freed from
 * memory using the returned `release` method.
 *
 * @returns `[previewAvailable, imageUrl, release]`
 */
export function useImagePreview(
  file?: File,
  options: {
    /** The maximum size of the preview in pixels. @default 400 */
    maxSize?: number;
    /** The quality to render the preview at. @default 0.8 */
    quality?: number;
  } = {},
) {
  const { maxSize = 400, quality = 0.8 } = options;

  const [imageUrl, setImageUrl] = useState("");
  const [revoked, setRevoked] = useState(false);

  const previewAvailable = useMemo(() => {
    if (!file) return false;
    if (!PREVIEW_MIME_TYPES.includes(file.type)) return false;
    return true;
  }, [file]);

  useEffect(() => {
    if (!file) return;
    if (!previewAvailable) return;
    imageFileToObjectURL(file, { maxSize, quality }).andTee(setImageUrl);
  }, [file, previewAvailable, maxSize, quality]);

  const release = useCallback(() => {
    if (!imageUrl) return;
    if (revoked) return;
    URL.revokeObjectURL(imageUrl);
    setRevoked(true);
  }, [imageUrl, revoked]);

  useEffect(() => {
    return release;
  }, [release]);

  return [previewAvailable, imageUrl, release] as const;
}
