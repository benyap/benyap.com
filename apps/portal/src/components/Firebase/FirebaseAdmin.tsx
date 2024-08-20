"use server";

import { type FirebaseProps } from "./Firebase";

/**
 * Initialises Firebase Admin on the server.
 *
 * This component should be rendered in the root layout.
 */
export async function FirebaseAdmin(props: FirebaseProps) {
  const { projectId } = props;

  if (!projectId)
    console.debug("Initialised Firebase Admin for project", projectId);

  return null;
}
