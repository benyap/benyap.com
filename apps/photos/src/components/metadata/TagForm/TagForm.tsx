"use client";

import { z } from "zod";
import { ResultAsync } from "neverthrow";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentReference } from "firebase/firestore";

import {
  Tag,
  TagCreateFailedException,
  TagSchema,
  TagUpdateFailedException,
} from "~/core/tag";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootErrorMessage,
} from "~/components/ui/form";

const TagFormSchema = z.object({
  name: TagSchema.shape.name.min(3, "Must have at least 3 characters."),
  description: TagSchema.shape.description,
  exifTagMatches: z.string().optional(),
});

export function TagForm(props: {
  tag?: Tag;
  onSave?: (
    tag: Tag,
  ) => ResultAsync<
    DocumentReference,
    TagCreateFailedException | TagUpdateFailedException
  >;
}) {
  const { tag, onSave } = props;

  const form = useForm<z.infer<typeof TagFormSchema>>({
    resolver: zodResolver(TagFormSchema),
    defaultValues: {
      name: tag?.name ?? "",
      description: tag?.description ?? "",
    },
  });

  function onSubmit(data: z.infer<typeof TagFormSchema>) {
    onSave?.({
      name: data.name,
      description: data.description,
      createdAt: tag?.createdAt ?? new Date(),
      updatedAt: new Date(),
    }).mapErr((error) => {
      console.error(error);
      form.setError("root", { message: String(error.cause) });
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormRootErrorMessage form={form} errorTitle="Could not save tag" />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag name</FormLabel>
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
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
