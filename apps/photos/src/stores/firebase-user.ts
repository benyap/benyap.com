import { createStore } from "zustand/vanilla";
import { Auth, getAuth, signOut, User, UserCredential } from "firebase/auth";

export type FirebaseUserState = {
  loading: boolean;
  user: User | null;
};

export type FirebaseUserActions = {
  signIn: () => void;
  signOut: () => void;
};

export type FirebaseUserStore = FirebaseUserState & FirebaseUserActions;

const defaultInitialState: FirebaseUserState = {
  loading: true,
  user: null,
};

export const createFirebaseUserStore = (
  signInFunction: (auth: Auth) => Promise<UserCredential>,
  initialState: FirebaseUserState = defaultInitialState,
) =>
  createStore<FirebaseUserStore>()(() => ({
    ...initialState,
    signIn: () => signInFunction(getAuth()),
    signOut: () => signOut(getAuth()),
  }));

export type FirebaseUserStoreApi = ReturnType<typeof createFirebaseUserStore>;
