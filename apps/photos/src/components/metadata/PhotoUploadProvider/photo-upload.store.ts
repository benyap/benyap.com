import { createStore } from "zustand/vanilla";

import { Photo } from "~/core/photo";
import { PhotoUploadException } from "~/core/photo/file";

export type PhotoUploadStep = "select-files" | "manage-metadata" | "upload";

export type PhotoUploadState = {
  step: PhotoUploadStep;
  files: File[];
  photos: Photo[];
  errors: PhotoUploadException[];
};

export type PhotoUploadActions = {
  setStep: (step: PhotoUploadStep) => void;
  addFiles: (files: File[]) => void;
  removeFile: (file: File) => void;
  setPhotos: (photos: Photo[]) => void;
  setErrors: (errors: PhotoUploadException[]) => void;
  reset: () => void;
};

export type PhotoUploadStore = PhotoUploadState & PhotoUploadActions;

const defaultInitialState: PhotoUploadState = {
  step: "select-files",
  files: [],
  photos: [],
  errors: [],
};

export const createPhotoUploadStore = (
  initialState: PhotoUploadState = defaultInitialState,
) =>
  createStore<PhotoUploadStore>()((set) => ({
    ...initialState,

    setStep: (step) => set(() => ({ step })),

    previousStep: () =>
      set(({ step }) => {
        switch (step) {
          case "manage-metadata":
            return { step: "select-files" };
          default:
            return { step };
        }
      }),

    addFiles: (newFiles) =>
      set(({ files: previousFiles }) => {
        // Ensure any files with the same name are replaced
        const oldFiles = previousFiles.filter(
          (file) => !newFiles.find((newFile) => file.name === newFile.name),
        );
        return { files: oldFiles.concat(newFiles) };
      }),

    removeFile: (file) =>
      set(({ files }) => ({
        files: files.filter((existing) => existing !== file),
      })),

    setPhotos: (photos) => set(() => ({ photos })),

    setErrors: (errors) => set(() => ({ errors })),

    reset: () =>
      set(() => ({
        step: "select-files",
        files: [],
        photos: [],
        errors: [],
      })),
  }));

export type PhotoUploadStoreApi = ReturnType<typeof createPhotoUploadStore>;
