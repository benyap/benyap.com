import { createStore } from "zustand/vanilla";

import { ObjectURLImagePreview } from "./ObjectURLImagePreview";

export type ImagePreviewState = {
  pending: Map<File, { maxSize: number; quality: number }>;
  previews: Map<File, ObjectURLImagePreview>;
};

export type ImagePreviewActions = {
  requestPreview: (
    file: File,
    options: { maxSize?: number; quality?: number },
  ) => void;
  releasePreview: (file: File) => void;
};

export type ImagePreviewStore = ImagePreviewState & ImagePreviewActions;

const defaultInitialState: ImagePreviewState = {
  pending: new Map(),
  previews: new Map(),
};

export const createImagePreviewStore = (
  initialState: ImagePreviewState = defaultInitialState,
) =>
  createStore<ImagePreviewStore>()((set) => ({
    ...initialState,

    requestPreview(file, { maxSize = 400, quality = 0.8 }) {
      set((prevState) => {
        const pending = new Map(prevState.pending);
        pending.set(file, { maxSize, quality });
        return { pending };
      });
    },

    releasePreview(file) {
      set((prevState) => {
        const pending = new Map(prevState.pending);
        const previews = new Map(prevState.previews);

        const isPending = pending.has(file);
        if (isPending) {
          pending.delete(file);
          return { pending };
        }

        const previewItem = previews.get(file);
        if (previewItem) {
          previewItem.revoke();
          previews.delete(file);
          return { previews };
        }

        return {};
      });
    },
  }));

export type ImagePreviewStoreApi = ReturnType<typeof createImagePreviewStore>;
