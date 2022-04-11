import { useEffect } from "react";
import { useAtom } from "jotai";
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";

import { firebaseInitialized } from "~/state/firebase";
import { PublicEnv } from "~/config/env";
import { Logger } from "~/utils/logger";

/**
 * Initializes the Firebase App and returns it once it's available.
 */
export function useFirebase(): FirebaseApp | null {
  const [initialized, setInitialized] = useAtom(firebaseInitialized);

  useEffect(() => {
    let app = getApps()[0];
    if (app) setInitialized(true);
    else {
      const config = PublicEnv.FIREBASE_CONFIG;
      if (config) {
        app = initializeApp(PublicEnv.FIREBASE_CONFIG);
        setInitialized(true);
        Logger.success("Initialized Firebase App:", app.options.projectId);
      }
    }
  }, [setInitialized]);

  return initialized ? getApp() : null;
}
