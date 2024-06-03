import { LogoDark } from "@packages/svgs";
import { greeting } from "@packages/utils";

export default function Page() {
  return (
    <main className="grid h-lvh place-items-center p-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-gray-900">{greeting()}</h1>
        <LogoDark className="fill-blue-200" />
        <p className="text-xl text-gray-700">This is the portal app.</p>
      </div>
    </main>
  );
}
