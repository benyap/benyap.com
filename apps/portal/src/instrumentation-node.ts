import type { ServiceAccount } from "firebase-admin/app";

export async function register() {
  const { cert, initializeApp } = await import("firebase-admin/app");
  const { getEnvValue } = await import("@packages/value");
  const { getSecretValue } = await import("@packages/secret");

  const projectId = getEnvValue("GCP_PROJECT");

  if (!projectId.value) throw new Error("GCP_PROJECT is required");

  if (process.env.NODE_ENV === "development") {
    process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";
    process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";
    initializeApp({ projectId: projectId.value });
  } else {
    const secret = await getSecretValue("FIREBASE_SERVICE_ACCOUNT");
    if (!secret.exists())
      throw new Error("FIREBASE_SERVICE_ACCOUNT is required");
    const serviceAccount = secret.decode("base64").toJSON().value;
    const credential = cert(serviceAccount as ServiceAccount);
    initializeApp({ projectId: projectId.value, credential });
  }

  console.debug("Initialised Firebase Admin for project", projectId);
}
