"use client";

import Link from "next/link";
import * as React from "react";

import { cn } from "~/lib/utils";

import { Heading, HeadingLevel, Subheading } from "~/components/ui/heading";
import { Text } from "~/components/ui/text";

const CardContext = React.createContext({ dense: false });

function Card({
  className,
  dense = false,
  children,
  ...props
}: React.ComponentProps<"div"> & { dense?: boolean }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col overflow-clip rounded-xl border",
        "@container/card has-data-[slot=card-media]:grid has-data-[slot=card-media]:grid-cols-[auto_1fr]",
        !dense && "gap-y-6 rounded-xl py-6",
        dense && "gap-y-4 rounded-lg py-4 sm:py-3",
        className,
      )}
      {...props}
    >
      <CardContext.Provider value={{ dense }}>{children}</CardContext.Provider>
    </div>
  );
}

function LinkCard({
  className,
  dense = false,
  children,
  ...props
}: React.ComponentProps<typeof Link> & { dense?: boolean }) {
  return (
    <Link
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground hover:bg-accent focus-visible:border-ring focus-visible:ring-ring/50 dark:hover:bg-input/50 dark:border-input flex flex-col overflow-clip border outline-none transition-all focus-visible:ring-[3px]",
        "@container/card has-data-[slot=card-media]:grid has-data-[slot=card-media]:grid-cols-[auto_1fr]",
        !dense && "gap-y-6 rounded-xl py-6",
        dense && "gap-y-4 rounded-lg py-4 sm:py-3",
        className,
      )}
      {...props}
    >
      <CardContext.Provider value={{ dense }}>{children}</CardContext.Provider>
    </Link>
  );
}

function CardMedia({ className, ...props }: React.ComponentProps<"div">) {
  const { dense } = React.useContext(CardContext);
  return (
    <div
      data-slot="card-media"
      className={cn(
        className,
        "@min-md:row-start-1 @min-md:row-end-4 @min-md:col-span-1 @max-md:w-full peer col-span-2 min-h-40",
        !dense && "@min-md:-my-6 -mt-6",
        dense && "@min-md:sm:-my-3 @min-md:-my-4 -mt-4",
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  const { dense } = React.useContext(CardContext);
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 grid auto-rows-min grid-rows-[auto_auto] items-start",
        !dense && "gap-2 px-6 sm:gap-1.5",
        dense && "gap-1 px-4",
        "@min-md:peer-data-[slot=card-media]:col-start-2 peer-data-[slot=card-media]:col-span-2",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({
  className,
  level = 2,
  ...props
}: React.ComponentProps<"div"> & { level?: HeadingLevel }) {
  const { dense } = React.useContext(CardContext);
  const Component = dense ? Subheading : Heading;
  return (
    <Component
      data-slot="card-title"
      className={cn("font-semibold leading-none", className)}
      level={level}
      {...props}
    />
  );
}

function CardDescription({
  className,
  color = "primary",
  ...props
}: React.ComponentProps<"div"> & React.ComponentProps<typeof Text>) {
  return (
    <Text
      data-slot="card-description"
      className={cn(className)}
      color={color}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  const { dense } = React.useContext(CardContext);
  return (
    <div
      data-slot="card-content"
      className={cn(
        !dense && "px-6",
        dense && "px-4",
        "@min-md:peer-data-[slot=card-media]:col-start-2 peer-data-[slot=card-media]:col-span-2",
        className,
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  const { dense } = React.useContext(CardContext);
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "[.border-t]:pt-6 flex items-center",
        !dense && "px-6",
        dense && "px-4",
        "@min-md:peer-data-[slot=card-media]:col-start-2 peer-data-[slot=card-media]:col-span-2",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  LinkCard,
  CardMedia,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
