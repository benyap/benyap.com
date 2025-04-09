"use client";

import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

import {
  createPhotoUploadStore,
  PhotoUploadStore,
  PhotoUploadStoreApi,
} from "./photo-upload.store";

const PhotoUploadStoreContext = createContext<PhotoUploadStoreApi | null>(null);

export function PhotoUploadProvider(props: React.PropsWithChildren) {
  const { children } = props;

  const ref = useRef<PhotoUploadStoreApi | null>(null);
  if (ref.current === null) ref.current = createPhotoUploadStore();

  return (
    <PhotoUploadStoreContext.Provider value={ref.current}>
      {children}
    </PhotoUploadStoreContext.Provider>
  );
}

export function usePhotoUpload(): PhotoUploadStore;

export function usePhotoUpload<T>(select: (store: PhotoUploadStore) => T): T;

export function usePhotoUpload<T>(
  select: (store: PhotoUploadStore) => T = (store) => store as T,
) {
  const context = useContext(PhotoUploadStoreContext);
  if (!context)
    throw new Error("usePhotoUpload must be used within PhotoUploadProvider");
  return useStore(context, select);
}
