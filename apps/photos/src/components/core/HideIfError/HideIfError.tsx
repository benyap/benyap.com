import { TriangleAlertIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Text } from "~/components/ui/typography";

export function HideIfError(
  props: React.PropsWithChildren<{ errorTitle?: string; error?: unknown }>,
) {
  const { children, errorTitle = "Error", error } = props;

  if (error) {
    return (
      <Alert variant="destructive">
        <TriangleAlertIcon className="h-4 w-4" />
        <AlertTitle>{errorTitle}</AlertTitle>
        <AlertDescription>
          <Text className="whitespace-pre-wrap">{String(error)}</Text>
        </AlertDescription>
      </Alert>
    );
  }

  return children;
}
