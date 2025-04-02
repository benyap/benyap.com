import { getFirestore } from "firebase-admin/firestore";
import { BlockingFunction } from "firebase-functions/v1";
import { beforeUserSignedIn, HttpsError } from "firebase-functions/v2/identity";
import * as logger from "firebase-functions/logger";

import { serviceAccount } from "../constants";

export const onBeforeUserSignedIn: BlockingFunction = beforeUserSignedIn(
  { serviceAccount },
  async (event) => {
    if (!event.data) throw new HttpsError("internal", "Event data unavailable");

    const user = event.data;

    const firestore = getFirestore();

    // Get profile from Firestore
    const ref = firestore.collection("users").doc(user.uid);
    const profile = await ref.get();
    const profileData = profile.data();

    // Add custom claims to the user's token if present
    if (profileData && "claims" in profileData) {
      logger.info({
        message: `User ${user.uid} signed in with ${user.email}`,
        sessionClaims: profileData.claims,
      });
      return {
        sessionClaims: profileData.claims,
      };
    }

    logger.info(`User ${user.uid} signed in with ${user.email}`);

    return {};
  },
);
