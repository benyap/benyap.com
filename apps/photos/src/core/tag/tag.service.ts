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

import { Tag, TagSchema } from "./tag.schema";
import {
  TagCreateFailedException,
  TagUpdateFailedException,
  TagDeleteFailedException,
} from "./tag.errors";

const converter: FirestoreDataConverter<Tag, Tag> = {
  fromFirestore(snapshot) {
    return TagSchema.extend({
      createdAt: TimestampToDate,
      updatedAt: TimestampToDate,
    }).parse(snapshot.data());
  },
  toFirestore(object) {
    object.createdAt ||= serverTimestamp();
    object.updatedAt = serverTimestamp();
    return object as Tag;
  },
};

function tagsCollection() {
  return collection(getFirestore(), "tags").withConverter(converter);
}

export function getTags() {
  return query(tagsCollection(), orderBy("name"));
}

export function getTag(id: string) {
  return doc(tagsCollection(), id);
}

export function createTag(tag: Tag) {
  return fromPromise(
    addDoc(tagsCollection(), tag),
    (cause) =>
      new TagCreateFailedException(`Could not create tag ${tag.name}`, cause),
  );
}

export function updateTag(tagId: string, tag: Tag) {
  const ref = getTag(tagId);
  return fromPromise(
    updateDoc(ref, tag).then(() => ref),
    (cause) =>
      new TagUpdateFailedException(`Could not update tag ${tag.name}`, cause),
  );
}

export function deleteTag(tagId: string, tag: Tag) {
  const ref = getTag(tagId);
  return fromPromise(
    deleteDoc(ref).then(() => ref),
    (cause) =>
      new TagDeleteFailedException(`Could not delete tag ${tag.name}`, cause),
  );
}
