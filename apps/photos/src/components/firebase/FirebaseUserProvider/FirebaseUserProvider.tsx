"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { useStore } from "zustand";
import {
  Auth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";

import {
  createFirebaseUserStore,
  FirebaseUserStore,
  FirebaseUserStoreApi,
} from "~/stores/firebase-user";

import { useFirebase } from "~/components/firebase/FirebaseProvider";

function signIn(auth: Auth) {
  const provider = new GoogleAuthProvider();

  // signInWithRedirect does not work when using the auth emulator
  if (auth.config.authDomain === "localhost")
    return signInWithPopup(auth, provider);

  return signInWithRedirect(auth, provider);
}

const FirebaseUserStoreContext = createContext<FirebaseUserStoreApi | null>(
  null,
);

export function FirebaseUserProvider(props: React.PropsWithChildren) {
  const { children } = props;

  const ref = useRef<FirebaseUserStoreApi | null>(null);
  if (ref.current === null) ref.current = createFirebaseUserStore(signIn);

  const auth = useFirebase(({ auth }) => auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const token = (await user?.getIdTokenResult()) ?? null;
      ref.current?.setState({ user, token, loading: false });
    });
    return unsubscribe;
  }, [auth]);

  return (
    <FirebaseUserStoreContext.Provider value={ref.current}>
      {children}
    </FirebaseUserStoreContext.Provider>
  );
}

export function useFirebaseUser(): FirebaseUserStore;

export function useFirebaseUser<T>(select: (store: FirebaseUserStore) => T): T;

export function useFirebaseUser<T>(
  select: (store: FirebaseUserStore) => T = (store) => store as T,
): T {
  const context = useContext(FirebaseUserStoreContext);
  if (!context)
    throw new Error(`useFirebaseUser must be used within FirebaseUserProvider`);
  return useStore(context, select);
}
