export const region = "australia-southeast1";

// The variable `GCLOUD_PROJECT` is provided by Google during deployment
export const projectId = process.env.GCLOUD_PROJECT ?? "demo-benyap";

export const serviceAccount = `cloudfunctions-service-account@${projectId}.iam.gserviceaccount.com`;
