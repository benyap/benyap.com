import { fromPromise } from "neverthrow";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  FirestoreDataConverter,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

import { TimestampToDate } from "~/lib/timestamp";

import { Camera, CameraSchema } from "./camera.schema";
import {
  CameraCreateFailedException,
  CameraUpdateFailedException,
  CameraDeleteFailedException,
} from "./camera.errors";

const converter: FirestoreDataConverter<Camera, Camera> = {
  fromFirestore(snapshot) {
    return CameraSchema.extend({
      createdAt: TimestampToDate,
      updatedAt: TimestampToDate,
    }).parse(snapshot.data());
  },
  toFirestore(object) {
    return object as Camera;
  },
};

function camerasCollection() {
  return collection(getFirestore(), "cameras").withConverter(converter);
}

export function getCameras() {
  return camerasCollection();
}

export function getCamera(id: string) {
  return doc(camerasCollection(), id);
}

export function createCamera(camera: Camera) {
  return fromPromise(
    addDoc(camerasCollection(), camera),
    (cause) =>
      new CameraCreateFailedException(
        `Could not create camera ${camera.name}`,
        cause,
      ),
  );
}

export function updateCamera(cameraId: string, camera: Camera) {
  const ref = getCamera(cameraId);
  return fromPromise(
    updateDoc(ref, camera).then(() => ref),
    (cause) =>
      new CameraUpdateFailedException(
        `Could not update camera ${camera.name}`,
        cause,
      ),
  );
}

export function deleteCamera(cameraId: string, camera: Camera) {
  const ref = getCamera(cameraId);
  return fromPromise(
    deleteDoc(ref).then(() => ref),
    (cause) =>
      new CameraDeleteFailedException(
        `Could not delete camera ${camera.name}`,
        cause,
      ),
  );
}
