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

import { Lens, LensSchema } from "./lens.schema";
import {
  LensCreateFailedException,
  LensUpdateFailedException,
  LensDeleteFailedException,
} from "./lens.errors";

const converter: FirestoreDataConverter<Lens, Lens> = {
  fromFirestore(snapshot) {
    return LensSchema.extend({
      createdAt: TimestampToDate,
      updatedAt: TimestampToDate,
    }).parse(snapshot.data());
  },
  toFirestore(object) {
    return object as Lens;
  },
};

function lensCollection() {
  return collection(getFirestore(), "lenses").withConverter(converter);
}

export function getLenses() {
  return lensCollection();
}

export function getLens(id: string) {
  return doc(lensCollection(), id);
}

export function createLens(lens: Lens) {
  return fromPromise(
    addDoc(lensCollection(), lens),
    (cause) =>
      new LensCreateFailedException(
        `Could not create lens ${lens.name}`,
        cause,
      ),
  );
}

export function updateLens(lensId: string, lens: Lens) {
  const ref = getLens(lensId);
  return fromPromise(
    updateDoc(ref, lens).then(() => ref),
    (cause) =>
      new LensUpdateFailedException(
        `Could not update lens ${lens.name}`,
        cause,
      ),
  );
}

export function deleteLens(lensId: string, lens: Lens) {
  const ref = getLens(lensId);
  return fromPromise(
    deleteDoc(ref).then(() => ref),
    (cause) =>
      new LensDeleteFailedException(
        `Could not delete lens ${lens.name}`,
        cause,
      ),
  );
}
