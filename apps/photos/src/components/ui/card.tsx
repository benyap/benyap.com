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
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
        !dense && "rounded-xl py-6",
        dense && "rounded-lg py-3",
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
        "bg-card text-card-foreground hover:bg-accent focus-visible:border-ring focus-visible:ring-ring/50 dark:hover:bg-input/50 dark:border-input flex flex-col gap-6 border outline-none transition-all focus-visible:ring-[3px]",
        !dense && "rounded-xl py-6",
        dense && "rounded-lg py-3",
        className,
      )}
      {...props}
    >
      <CardContext.Provider value={{ dense }}>{children}</CardContext.Provider>
    </Link>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  const { dense } = React.useContext(CardContext);
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 grid auto-rows-min grid-rows-[auto_auto] items-start",
        !dense && "gap-1.5 px-6",
        dense && "gap-1 px-4",
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

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Text
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
      color="secondary"
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
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("[.border-t]:pt-6 flex items-center px-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  LinkCard,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
