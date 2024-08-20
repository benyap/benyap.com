import { authenticate } from "@packages/auth";
import { getLoginURL } from "@packages/utils";

import { getFirestore } from "firebase-admin/firestore";

export default async function Page() {
  await authenticate(getLoginURL({ returnToCurrentPath: true }));

  const fs = getFirestore();
  const snap = await fs.doc("hello/world").get();
  console.log("hello", snap.data());

  return (
    <main className="grid h-lvh place-items-center p-8">
      <div className="space-y-2 text-center">
        <h1 className="font-bold">Hello World</h1>
        <p className="">This is the portal app!.</p>
      </div>
    </main>
  );
}
