import { CircleHelpIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export function NotFoundMessage(
  props: React.PropsWithChildren<{ title?: React.ReactNode }>,
) {
  const { title = "Not Found", children } = props;
  return (
    <Alert className="text-muted-foreground">
      <CircleHelpIcon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      {children && <AlertDescription>{children}</AlertDescription>}
    </Alert>
  );
}
