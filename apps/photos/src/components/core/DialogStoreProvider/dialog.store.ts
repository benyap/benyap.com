import { SetStateAction } from "react";
import { createStore } from "zustand/vanilla";

export type DialogState = {
  open: boolean;
};

export type DialogActions = {
  setOpen: (open: SetStateAction<boolean>) => void;
};

export type DialogStore = DialogState & DialogActions;

const defaultInitialState: DialogState = {
  open: false,
};

export const createDialogStore = (
  initialState: DialogState = defaultInitialState,
) =>
  createStore<DialogStore>()((set) => ({
    ...initialState,
    setOpen: (open) =>
      typeof open === "function"
        ? set((prevState) => ({ open: open(prevState.open) }))
        : set({ open }),
  }));

export type DialogStoreApi = ReturnType<typeof createDialogStore>;
