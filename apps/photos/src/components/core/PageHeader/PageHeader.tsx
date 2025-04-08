import { cn } from "~/lib/utils";

export function PageHeader(
  props: React.PropsWithChildren<{ className?: string }>,
) {
  const { className, children } = props;
  return (
    <header className={cn(className, "mb-6 flex justify-between gap-4")}>
      {children}
    </header>
  );
}
