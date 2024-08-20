"use server";

import { getEnvValue } from "@packages/value";

import { FirebaseClient } from "./FirebaseClient";
import { FirebaseAdmin } from "./FirebaseAdmin";

export type FirebaseProps = { projectId: string };

/**
 * Initialises Firebase.
 *
 * This component should be rendered in the root layout.
 */
export async function Firebase() {
  const projectId = getEnvValue("GCP_PROJECT");

  if (!projectId.value) throw new Error("GCP_PROJECT is required");

  return (
    <>
      <FirebaseAdmin projectId={projectId.value} />
      <FirebaseClient projectId={projectId.value} />
    </>
  );
}
