"use client";

import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

import {
  createFirebaseStore,
  FirebaseStore,
  FirebaseStoreApi,
} from "~/stores/firebase";

const FirebaseStoreContext = createContext<FirebaseStoreApi | null>(null);

export function FirebaseProvider(props: { children?: React.ReactNode }) {
  const { children } = props;

  const ref = useRef<FirebaseStoreApi | null>(null);
  if (ref.current === null) ref.current = createFirebaseStore();

  return (
    <FirebaseStoreContext.Provider value={ref.current}>
      {children}
    </FirebaseStoreContext.Provider>
  );
}

export function useFirebase<T>(selector: (store: FirebaseStore) => T) {
  const context = useContext(FirebaseStoreContext);
  if (!context)
    throw new Error("useFirebase must be used within FirebaseProvider");
  return useStore(context, selector);
}
