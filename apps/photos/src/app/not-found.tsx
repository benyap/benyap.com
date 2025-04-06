"use client";

import { CircleHelpIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function Page() {
  const { back } = useRouter();
  return (
    <main className="grid h-dvh place-items-center px-8">
      <Card className="shadow-xs w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>
            <CircleHelpIcon className="text-muted-foreground mr-2.5 mt-0.5 inline size-6 align-text-top sm:mr-2 sm:size-5" />
            Not Found
          </CardTitle>
          <CardDescription>This page does not exist.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="secondary" onClick={back}>
            Go back
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
