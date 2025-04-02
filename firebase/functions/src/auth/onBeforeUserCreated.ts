import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { BlockingFunction } from "firebase-functions/v1";
import { beforeUserCreated, HttpsError } from "firebase-functions/v2/identity";
import * as logger from "firebase-functions/logger";

import { serviceAccount } from "../constants";

export const onBeforeUserCreated: BlockingFunction = beforeUserCreated(
  { serviceAccount },
  async (event) => {
    if (!event.data) throw new HttpsError("internal", "Event data unavailable");

    const user = event.data;

    const firestore = getFirestore();
    const ref = firestore.collection("users").doc(user.uid);

    const userProfile = {
      id: user.uid,
      email: user.email ?? "",
      displayName: user.displayName ?? "",
      created: FieldValue.serverTimestamp(),
      updated: FieldValue.serverTimestamp(),
    };

    await ref.create(userProfile);

    logger.info(`Created user ${user.uid}`, userProfile);
  },
);
