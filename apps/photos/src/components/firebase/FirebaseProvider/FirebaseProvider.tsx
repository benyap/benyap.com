"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initializeApp, FirebaseApp } from "firebase/app";
import {
  Analytics,
  isSupported,
  initializeAnalytics,
} from "firebase/analytics";

const FIREBASE_CONFIG = process.env["NEXT_PUBLIC_FIREBASE_CONFIG"];

const FirebaseContext = createContext<{
  app: FirebaseApp;
  analytics: Analytics | undefined;
} | null>(null);

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) throw new Error("Firebase is not available");
  return context;
}

export function FirebaseProvider(props: { children?: React.ReactNode }) {
  const { children } = props;

  if (!FIREBASE_CONFIG) throw new Error("FIREBASE_CONFIG not available");

  const app = useMemo(() => initializeApp(JSON.parse(FIREBASE_CONFIG)), []);

  const [analytics, setAnalytics] = useState<Analytics>();

  useEffect(() => {
    isSupported().then((supported) => {
      if (!supported) return;
      const analytics = initializeAnalytics(app);
      const measurementId = analytics.app.options.measurementId;
      console.debug("Initialised Firebase Analytics", measurementId);
      setAnalytics(analytics);
    });
  }, [app]);

  return (
    <FirebaseContext.Provider value={{ app, analytics }}>
      {children}
    </FirebaseContext.Provider>
  );
}
