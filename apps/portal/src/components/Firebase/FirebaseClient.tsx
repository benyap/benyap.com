"use client";

import { useEffect } from "react";
import { getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";

import { getEnvValue } from "@packages/value";

import { type FirebaseProps } from "./Firebase";

/**
 * Initialises Firebase on the client.
 *
 * This component should be rendered in the root layout.
 */
export function FirebaseClient(props: FirebaseProps) {
  const { projectId } = props;

  useEffect(() => {
    const apps = getApps();
    if (apps.length > 0) return;

    if (process.env.NODE_ENV === "development") {
      initializeApp({ projectId, apiKey: "fake-api-key" });
      connectAuthEmulator(getAuth(), "http://127.0.0.1:9099");
    } else {
      const value = getEnvValue("NEXT_PUBLIC_FIREBASE_CONFIG");
      if (!value.exists())
        throw new Error("NEXT_PUBLIC_FIREBASE_CONFIG is required");
      const config = value.decode("base64").toJSON().value;
      initializeApp(config as FirebaseOptions);
    }

    console.debug("Initialised Firebase for project", projectId);
  }, [projectId]);

  return null;
}
