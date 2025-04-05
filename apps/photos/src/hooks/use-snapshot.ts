import { useCallback, useEffect, useState } from "react";
import { onSnapshot, queryEqual, refEqual } from "firebase/firestore";

import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  FirestoreError,
  Query,
  QuerySnapshot,
} from "firebase/firestore";

/**
 * Creates a stable reference to a Firestore reference/query.
 */
function useStableRef<
  T extends
    | DocumentReference<AppModelType, DbModelType>
    | CollectionReference<AppModelType, DbModelType>
    | Query<AppModelType, DbModelType>,
  AppModelType,
  DbModelType extends DocumentData,
>(ref: T | null): T | null {
  const [cachedRef, setCachedRef] = useState<typeof ref | null>(null);

  useEffect(() => {
    if (!ref) {
      setCachedRef(null);
      return;
    }

    if (
      ref.type === "query" &&
      cachedRef?.type === "query" &&
      queryEqual(ref, cachedRef)
    )
      return;

    if (
      ref.type === "collection" &&
      cachedRef?.type === "collection" &&
      queryEqual(ref, cachedRef)
    )
      return;

    if (
      ref.type === "document" &&
      cachedRef?.type === "document" &&
      refEqual(ref, cachedRef)
    )
      return;

    // Only update the ref if it has changed
    setCachedRef(ref);
  }, [ref, cachedRef]);

  return cachedRef;
}

/**
 * Subscribes to snapshots for the given document reference.
 *
 * @returns `[loading, snapshot, error, notFound]`
 */
export function useSnapshot<AppModelType, DbModelType extends DocumentData>(
  doc: DocumentReference<AppModelType, DbModelType> | null,
): [
  boolean,
  DocumentSnapshot<AppModelType, DbModelType> | undefined,
  FirestoreError | undefined,
  boolean,
];

/**
 * Subscribes to snapshots for the given collection reference.
 *
 * @returns `[loading, snapshot, error, notFound]`
 */
export function useSnapshot<AppModelType, DbModelType extends DocumentData>(
  collection: CollectionReference<AppModelType, DbModelType> | null,
): [
  boolean,
  QuerySnapshot<AppModelType, DbModelType> | undefined,
  FirestoreError | undefined,
  boolean,
];

/**
 * Subscribes to snapshots for the given query.
 *
 * @returns `[loading, snapshot, error, notFound]`
 */
export function useSnapshot<AppModelType, DbModelType extends DocumentData>(
  query: Query<AppModelType, DbModelType> | null,
): [
  boolean,
  QuerySnapshot<AppModelType, DbModelType> | undefined,
  FirestoreError | undefined,
  boolean,
];

// Implementation
export function useSnapshot<AppModelType, DbModelType extends DocumentData>(
  query:
    | DocumentReference<AppModelType, DbModelType>
    | CollectionReference<AppModelType, DbModelType>
    | Query<AppModelType, DbModelType>
    | null,
) {
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState<FirestoreError>();

  const [snapshot, setSnapshot] = useState<
    | DocumentSnapshot<AppModelType, DbModelType>
    | QuerySnapshot<AppModelType, DbModelType>
  >();

  const ref = useStableRef(query);

  const onNextDoc = useCallback(
    (snapshot: DocumentSnapshot<AppModelType, DbModelType>) => {
      setLoading(false);
      setError(undefined);
      setSnapshot((prevSnapshot) => {
        if (
          !snapshot.exists() &&
          prevSnapshot instanceof DocumentSnapshot &&
          prevSnapshot.exists()
        )
          setDeleted(true);
        return snapshot;
      });
    },
    [],
  );

  const onNextQuery = useCallback(
    (snapshot: QuerySnapshot<AppModelType, DbModelType>) => {
      setLoading(false);
      setError(undefined);
      setSnapshot(snapshot);
    },
    [],
  );

  const onError = useCallback((error: FirestoreError) => {
    setError(error);
  }, []);

  useEffect(() => {
    if (!ref) return;

    const unsubscribe =
      ref.type === "document"
        ? onSnapshot(ref, onNextDoc, onError)
        : onSnapshot(ref, onNextQuery, onError);

    return () => {
      unsubscribe();
    };
  }, [ref, onNextDoc, onNextQuery, onError]);

  const notFound =
    snapshot instanceof DocumentSnapshot &&
    !snapshot.data() &&
    !loading &&
    !deleted;

  return [loading, snapshot, error, notFound] as const;
}
