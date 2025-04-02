import { createStore } from "zustand";
import { initializeApp, FirebaseApp, FirebaseOptions } from "firebase/app";
import { connectAuthEmulator, getAuth, Auth } from "firebase/auth";
import {
  connectFirestoreEmulator,
  getFirestore,
  Firestore,
} from "firebase/firestore";
import {
  connectStorageEmulator,
  getStorage,
  FirebaseStorage,
} from "firebase/storage";
import { isSupported, initializeAnalytics } from "firebase/analytics";

const FIRESTORE_DATABASE_ID =
  process.env.NEXT_PUBLIC_FIRESTORE_DATABASE_ID || "(default)";

const FIREBASE_AUTH_DOMAIN = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;

const FIREBASE_CONFIG =
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG ||
  JSON.stringify({
    projectId: "demo-benyap",
    storageBucket: "demo-benyap.appspot.com",
    apiKey: "demo-api-key",
    authDomain: "localhost",
  } satisfies FirebaseOptions);

/**
 * Get the Firebase config for the current environment.
 *
 * If `NEXT_PUBLIC_FIREBASE_CONFIG` is present, it will be
 * parsed to use as the config for initialising Firebase.
 * Otherwise, it is assumed that the application is connecting
 * to the local Firebase emulator.
 */
function getFirebaseConfig(): FirebaseOptions {
  const config = JSON.parse(FIREBASE_CONFIG) as FirebaseOptions;
  if (FIREBASE_AUTH_DOMAIN) config.authDomain = FIREBASE_AUTH_DOMAIN;
  return config;
}

export type FirebaseStore = {
  emulator: boolean;
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  storage: FirebaseStorage;
};
export const createFirebaseStore = () => {
  const config = getFirebaseConfig();
  const emulator = config.projectId?.startsWith("demo") ?? false;

  const app = initializeApp(config);

  if (emulator) {
    connectFirestoreEmulator(
      getFirestore(FIRESTORE_DATABASE_ID),
      "127.0.0.1",
      8080,
    );
    connectStorageEmulator(getStorage(), "127.0.0.1", 9199);
    connectAuthEmulator(getAuth(), "http://127.0.0.1:9099", {
      disableWarnings: true,
    });

    console.debug("🤖 Connected to Firebase emulator");
  } else {
    isSupported().then((supported) => {
      if (!supported) return;
      const analytics = initializeAnalytics(app);
      const measurementId = analytics.app.options.measurementId;
      console.debug("📊 Initialised Firebase Analytics", measurementId);
    });
  }

  console.debug("🔥 Initialised Firebase for project", config.projectId);

  return createStore<FirebaseStore>()(() => ({
    emulator,
    app,
    auth: getAuth(app),
    firestore: getFirestore(app, FIRESTORE_DATABASE_ID),
    storage: getStorage(app),
  }));
};

export type FirebaseStoreApi = ReturnType<typeof createFirebaseStore>;
