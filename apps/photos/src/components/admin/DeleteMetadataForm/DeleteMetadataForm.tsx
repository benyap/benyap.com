import { DocumentReference } from "firebase/firestore";
import { ResultAsync } from "neverthrow";
import { useForm } from "react-hook-form";

import { Exception } from "~/lib/exception";

import { Form, FormRootErrorMessage } from "~/components/ui/form";
import { Button } from "~/components/ui/button";

export function DeleteMetadataForm<TCode extends string>(props: {
  onDelete?: () => ResultAsync<DocumentReference, Exception<TCode>>;
  onCancel?: () => void;
}) {
  const { onDelete, onCancel } = props;

  const form = useForm();

  function onSubmit() {
    onDelete?.().mapErr((error) => {
      console.error(error);
      form.setError("root", { message: error.message });
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormRootErrorMessage form={form} />
        <div className="flex gap-2">
          <Button type="submit" variant="destructive">
            Delete
          </Button>
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
