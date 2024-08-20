import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import { EError } from "exceptional-errors";

import { Value, getEnvValue } from "@packages/value";

export class GetSecretError extends EError<never> {}

const secretManager = new SecretManagerServiceClient();

/**
 * Get a secret value.
 *
 * If `process.NODE_ENV` is "development", secrets are read from `process.env`.
 *
 * Otherwise, `GCP_PROJECT` must be specified and Application Default Credentials are used
 * to fetch the secret value from Google Secret Manager. If you need to specify a version,
 * append the version to the key with a "/". For example, `MY_SECRET/latest`.
 */
export async function getSecretValue(key: string): Promise<Value<string>> {
  const [secretName, secretVersion = "latest"] = key.split("/");
  if (!secretName) throw new GetSecretError(`Invalid secret name`);

  if (process.env["NODE_ENV"] === "development") {
    const value = getEnvValue(key);
    if (!value.exists())
      throw new GetSecretError(`local ${secretName} is empty`);
    return value;
  }

  const projectId = getEnvValue("GCP_PROJECT");
  if (!projectId.exists())
    throw new GetSecretError(`GCP_PROJECT is required to fetch secrets`);

  const parent = `projects/${projectId.value}`;
  const filter = `name:${secretName}`;

  const [[secret]] = await secretManager.listSecrets({ parent, filter });
  if (!secret) throw new GetSecretError(`${secretName} not found`);

  const name = `${parent}/secrets/${secretName}/versions/${secretVersion}`;
  const [version] = await secretManager.accessSecretVersion({ name });

  const value = version.payload?.data?.toString();
  if (!value) throw new GetSecretError(`${secretName} is empty`);

  return Value.from(value, key, "secret");
}
