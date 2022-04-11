import { useEffect } from "react";
import { getAnalytics, setCurrentScreen } from "firebase/analytics";

import { useFirebase } from "./core";

/**
 * Initializes Firebase Analytics and returns the analytics instance.
 */
export function useAnalytics() {
  const app = useFirebase();
  return app ? getAnalytics(app) : null;
}

/**
 * Set the screen name for Firebase Analytics.
 * @param name The name to use for the screen.
 */
export function useScreenNameForAnalytics(name: string) {
  const analytics = useAnalytics();
  useEffect(() => {
    if (!analytics) return;
    setCurrentScreen(analytics, name);
  }, [analytics, name]);
}
