import { cn } from "~/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

function SkeletonText({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <>
      <span
        data-slot="skeleton"
        className={cn(
          "bg-accent inline-block h-[1em] animate-pulse rounded-md",
          className,
        )}
        {...props}
      />
      &nbsp;
    </>
  );
}

export { Skeleton, SkeletonText };
