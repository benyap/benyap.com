"use client";

import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

import {
  createFirebaseStore,
  FirebaseStore,
  FirebaseStoreApi,
} from "./firebase.store";

const FirebaseStoreContext = createContext<FirebaseStoreApi | null>(null);

export function FirebaseProvider(props: React.PropsWithChildren) {
  const { children } = props;

  const ref = useRef<FirebaseStoreApi | null>(null);
  if (ref.current === null) ref.current = createFirebaseStore();

  return (
    <FirebaseStoreContext.Provider value={ref.current}>
      {children}
    </FirebaseStoreContext.Provider>
  );
}

export function useFirebase(): FirebaseStore;

export function useFirebase<T>(select: (store: FirebaseStore) => T): T;

export function useFirebase<T>(
  select: (store: FirebaseStore) => T = (store) => store as T,
) {
  const context = useContext(FirebaseStoreContext);
  if (!context)
    throw new Error("useFirebase must be used within FirebaseProvider");
  return useStore(context, select);
}
