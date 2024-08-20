import { getApp, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getFirebaseApp() {
  if (getApps().length === 0) return initializeApp();
  return getApp();
}

export const app = getFirebaseApp();
export const firestore = getFirestore();
