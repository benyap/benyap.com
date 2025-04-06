import { fromPromise } from "neverthrow";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  FirestoreDataConverter,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { TimestampToDate } from "~/lib/timestamp";

import { Location, LocationSchema } from "./location.schema";
import {
  LocationCreateFailedException,
  LocationUpdateFailedException,
  LocationDeleteFailedException,
} from "./location.errors";

const converter: FirestoreDataConverter<Location, Location> = {
  fromFirestore(snapshot) {
    return LocationSchema.extend({
      createdAt: TimestampToDate,
      updatedAt: TimestampToDate,
    }).parse(snapshot.data());
  },
  toFirestore(object) {
    object.createdAt ||= serverTimestamp();
    object.updatedAt = serverTimestamp();
    return object as Location;
  },
};

function locationCollection() {
  return collection(getFirestore(), "locations").withConverter(converter);
}

export function getLocations() {
  return query(locationCollection(), orderBy("name"));
}

export function getLocation(id: string) {
  return doc(locationCollection(), id);
}

export function createLocation(location: Location) {
  return fromPromise(
    addDoc(locationCollection(), location),
    (cause) =>
      new LocationCreateFailedException(
        `Could not create location ${location.name}`,
        cause,
      ),
  );
}

export function updateLocation(locationId: string, location: Location) {
  const ref = getLocation(locationId);
  return fromPromise(
    updateDoc(ref, location).then(() => ref),
    (cause) =>
      new LocationUpdateFailedException(
        `Could not update location ${location.name}`,
        cause,
      ),
  );
}

export function deleteLocation(locationId: string, location: Location) {
  const ref = getLocation(locationId);
  return fromPromise(
    deleteDoc(ref).then(() => ref),
    (cause) =>
      new LocationDeleteFailedException(
        `Could not delete location ${location.name}`,
        cause,
      ),
  );
}
