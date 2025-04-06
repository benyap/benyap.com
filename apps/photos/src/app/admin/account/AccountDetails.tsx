"use client";

import { useFirebaseUser } from "~/components/firebase/FirebaseUserProvider";
import { Button } from "~/components/ui/button";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "~/components/ui/description-list";
import { SkeletonText } from "~/components/ui/skeleton";

export function AccountDetails() {
  const { loading, user, signOut } = useFirebaseUser();
  return (
    <>
      <DescriptionList className="mb-4">
        <DescriptionTerm>Signed in as</DescriptionTerm>
        <DescriptionDetails>
          {user?.displayName ?? (loading && <SkeletonText className="w-40" />)}
        </DescriptionDetails>

        <DescriptionTerm>Email</DescriptionTerm>
        <DescriptionDetails>
          {user?.email ?? (loading && <SkeletonText className="w-40" />)}
        </DescriptionDetails>
      </DescriptionList>
      <Button variant="outline" onClick={signOut}>
        Sign out
      </Button>
    </>
  );
}
