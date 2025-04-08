"use client";

import {
  DocumentData,
  FirestoreError,
  QuerySnapshot,
} from "firebase/firestore";
import { createContext, useCallback, useContext } from "react";

import { Camera, getCameras } from "~/core/camera";
import { getLenses, Lens } from "~/core/lens";
import { getLocations, Location } from "~/core/location";
import { getTags, Tag } from "~/core/tag";

import { useSnapshot } from "~/hooks/use-snapshot";

export type UseCollectionSnapshot<
  AppModelType extends DocumentData,
  DbModelType extends DocumentData = AppModelType,
> = [
  boolean,
  QuerySnapshot<AppModelType, DbModelType> | undefined,
  FirestoreError | undefined,
  boolean,
];

const MetadataContext = createContext<{
  cameras: UseCollectionSnapshot<Camera>;
  lenses: UseCollectionSnapshot<Lens>;
  locations: UseCollectionSnapshot<Location>;
  tags: UseCollectionSnapshot<Tag>;
} | null>(null);

export function MetadataProvider(props: React.PropsWithChildren) {
  const { children } = props;

  const cameras = useSnapshot(getCameras());
  const lenses = useSnapshot(getLenses());
  const locations = useSnapshot(getLocations());
  const tags = useSnapshot(getTags());

  return (
    <MetadataContext.Provider value={{ cameras, lenses, locations, tags }}>
      {children}
    </MetadataContext.Provider>
  );
}

export function useMetadata() {
  const context = useContext(MetadataContext);
  if (!context)
    throw new Error("useMetadata must be used within MetadataProvider");
  return context;
}

export function useFindMetadata() {
  const {
    cameras: [, cameras],
    lenses: [, lenses],
    locations: [, locations],
    tags: [, tags],
  } = useMetadata();

  return useCallback(
    (type: keyof ReturnType<typeof useMetadata>, id: string) => {
      const data = { cameras, lenses, locations, tags };
      return data[type]?.docs.find((snapshot) => snapshot.id === id);
    },
    [cameras, lenses, locations, tags],
  );
}
