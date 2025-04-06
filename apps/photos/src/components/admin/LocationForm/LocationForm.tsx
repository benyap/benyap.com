"use client";

import { z } from "zod";
import { ResultAsync } from "neverthrow";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentReference } from "firebase/firestore";

import {
  Location,
  LocationCreateFailedException,
  LocationSchema,
  LocationUpdateFailedException,
} from "~/core/location";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const LocationFormSchema = z.object({
  name: LocationSchema.shape.name.min(3, "Must have at least 3 characters."),
  description: LocationSchema.shape.description,
  type: LocationSchema.shape.type,
  relatedTo: LocationSchema.shape.relatedTo,
});

export function LocationForm(props: {
  location?: Location;
  onSave?: (
    location: Location,
  ) => ResultAsync<
    DocumentReference,
    LocationCreateFailedException | LocationUpdateFailedException
  >;
}) {
  const { location, onSave } = props;

  const form = useForm<z.infer<typeof LocationFormSchema>>({
    resolver: zodResolver(LocationFormSchema),
    defaultValues: {
      name: location?.name ?? "",
      description: location?.description ?? "",
      type: location?.type ?? "place",
      relatedTo: location?.relatedTo ?? [],
    },
  });

  function onSubmit(data: z.infer<typeof LocationFormSchema>) {
    onSave?.({
      name: data.name,
      description: data.description,
      type: data.type,
      relatedTo: data.relatedTo,
      createdAt: location?.createdAt ?? new Date(),
      updatedAt: new Date(),
    }).mapErr((error) => {
      console.error(error);
      form.setError("root", { message: String(error.cause) });
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormRootErrorMessage
          form={form}
          errorTitle="Could not save location"
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(LocationFormSchema.shape.type.Values).map(
                    (value) => (
                      <SelectItem key={value} value={value}>
                        <span className="capitalize">{value}</span>
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
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
