"use client";

import { z } from "zod";
import { ResultAsync } from "neverthrow";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentReference } from "firebase/firestore";

import {
  Lens,
  LensSchema,
  LensCreateFailedException,
  LensDeleteFailedException,
  LensUpdateFailedException,
} from "~/core/lens";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootErrorMessage,
} from "~/components/ui/form";

const LensFormSchema = z.object({
  name: LensSchema.shape.name.min(3, "Must have at least 3 characters."),
  description: LensSchema.shape.description,
  exifTagMatches: z.string().optional(),
});

export function LensForm(props: {
  lens?: Lens;
  onSave?: (
    lens: Lens,
  ) => ResultAsync<
    DocumentReference,
    LensCreateFailedException | LensUpdateFailedException
  >;
}) {
  const { lens, onSave } = props;

  const form = useForm<z.infer<typeof LensFormSchema>>({
    resolver: zodResolver(LensFormSchema),
    defaultValues: {
      name: lens?.name ?? "",
      description: lens?.description ?? "",
      exifTagMatches: lens?.exifTagMatches.join("\n") ?? "",
    },
  });

  function onSubmit(data: z.infer<typeof LensFormSchema>) {
    const now = new Date();
    onSave?.({
      name: data.name,
      description: data.description,
      exifTagMatches:
        data.exifTagMatches
          ?.split("\n")
          .map((m) => m.trim())
          .filter((m) => m.length > 0) ?? [],
      createdAt: now,
      updatedAt: now,
    }).mapErr((error) => {
      console.error(error);
      form.setError("root", { message: String(error.cause) });
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormRootErrorMessage form={form} errorTitle="Could not save lens" />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lens name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="exifTagMatches"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exif tag matches</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                A list of values that will match a photo&apos;s Exif{" "}
                <code>Lens</code> tag to this lens. Specify each value on a new
                line.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}

export function DeleteLensForm(props: {
  onDelete?: () => ResultAsync<DocumentReference, LensDeleteFailedException>;
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
