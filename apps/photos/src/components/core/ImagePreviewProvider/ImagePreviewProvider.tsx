"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useStore } from "zustand";

import { imageFileToObjectURL } from "~/lib/image";

import {
  createImagePreviewStore,
  ImagePreviewStoreApi,
} from "./image-preview.store";
import { ObjectURLImagePreview } from "./ObjectURLImagePreview";

const PREVIEW_MIME_TYPES = ["image/jpeg"];

const ImagePreviewContext = createContext<ImagePreviewStoreApi | null>(null);

export function ImagePreviewProvider(props: React.PropsWithChildren) {
  const { children } = props;

  const [processing, setProcessing] = useState(false);

  const ref = useRef<ImagePreviewStoreApi | null>(null);
  if (ref.current === null) {
    ref.current = createImagePreviewStore();
    ref.current.subscribe((state) => {
      setProcessing(state.pending.size > 0);
    });
  }

  useEffect(() => {
    function createNextImagePreview() {
      if (!ref.current) return;

      const entry = ref.current.getState().pending.entries().next().value;
      if (!entry) return;

      const [file, options] = entry;

      const pending = new Map(ref.current.getState().pending);

      if (!PREVIEW_MIME_TYPES.includes(file.type)) {
        console.debug("Preview image not available for", file.name);
        pending.delete(file);
        ref.current.setState({ pending });
        createNextImagePreview();
      } else {
        imageFileToObjectURL(file, options).map((url) => {
          const previews = new Map(ref.current?.getState().previews);
          previews.set(file, new ObjectURLImagePreview(url, file.name));
          console.debug("Preview image generated for", file.name);
          pending.delete(file);
          ref.current?.setState({ pending, previews });
          createNextImagePreview();
        });
      }
    }

    createNextImagePreview();
  }, [processing]);

  return (
    <ImagePreviewContext.Provider value={ref.current}>
      {children}
    </ImagePreviewContext.Provider>
  );
}

export function useImagePreview(
  file: File | undefined,
  options: { maxSize?: number; quality?: number } = {},
): ObjectURLImagePreview | null {
  const context = useContext(ImagePreviewContext);
  if (!context)
    throw new Error(`useImagePreview must be used within ImagePreviewProvider`);

  const { maxSize = 400, quality = 0.8 } = options;
  const { requestPreview, releasePreview, previews } = useStore(context);

  const preview = file ? previews.get(file) : null;

  useEffect(() => {
    if (!file) return;
    if (preview) return;
    requestPreview(file, { maxSize, quality });
  }, [file, preview, maxSize, quality, requestPreview, releasePreview]);

  useEffect(() => {
    if (!file) return;
    return () => releasePreview(file);
  }, [file, releasePreview]);

  return preview ?? null;
}
