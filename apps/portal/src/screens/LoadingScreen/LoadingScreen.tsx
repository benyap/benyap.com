import { LoadingLogo } from "~/components/LoadingLogo";

export function LoadingScreen() {
  return (
    <main className="grid h-lvh place-items-center p-8">
      <div className="space-y-2 text-center">
        <LoadingLogo className="text-brand-800" />
      </div>
    </main>
  );
}
