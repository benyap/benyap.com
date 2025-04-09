"use client";

import { useContext, useRef } from "react";
import { useStore } from "zustand";

import { createDialogStore, DialogStoreApi } from "./dialog.store";

export function DialogStoreProvider(
  props: React.PropsWithChildren<{
    contexts: React.Context<DialogStoreApi | null>[];
  }>,
) {
  const {
    contexts: [Context, ...remainingContexts],
    children,
  } = props;

  const ref = useRef<DialogStoreApi | null>(null);

  if (!Context) return children;

  if (ref.current === null) ref.current = createDialogStore();

  return (
    <Context.Provider value={ref.current}>
      <DialogStoreProvider contexts={remainingContexts}>
        {children}
      </DialogStoreProvider>
    </Context.Provider>
  );
}

export function useDialogStore(context: React.Context<DialogStoreApi | null>) {
  const contextValue = useContext(context);
  if (!contextValue)
    throw new Error("useDialogStore must be used within DialogStoreProvider");
  return useStore(contextValue, (s) => s);
}
