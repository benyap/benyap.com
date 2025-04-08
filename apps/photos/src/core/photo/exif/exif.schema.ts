import { z } from "zod";

export const StringTagSchema = z.object({
  value: z.string().optional(),
  description: z.string().optional(),
});

export const RationalSchema = z.tuple([z.number(), z.number()]);

export const RationalTagSchema = z.object({
  value: RationalSchema.optional(),
  description: z.string().optional(),
});

export const IntegerSchema = z.number().int();

export const IntegerTagSchema = z.object({
  value: IntegerSchema.optional(),
  description: z.string().optional(),
});

export const DateTimeObjectSchema = z.object({
  year: z.number(),
  month: z.number(),
  day: z.number(),
  hour: z.number(),
  minute: z.number(),
  second: z.number(),
  millisecond: z.number(),
});

export const ProcessedExifTagsSchema = z.object({
  camera: z.object({
    make: z.string().optional(),
    model: z.string().optional(),
  }),
  lens: z.object({
    make: z.string().optional(),
    model: z.string().optional(),
    maxApertureValue: RationalTagSchema,
  }),
  originalDate: DateTimeObjectSchema.optional(),
  focalLength: RationalTagSchema,
  focalLengthIn35mmFilm: IntegerSchema.optional(),
  iso: IntegerSchema.optional(),
  fNumber: RationalTagSchema,
  exposureTime: RationalTagSchema,
  exposureBias: RationalTagSchema,
  exposureMode: IntegerTagSchema,
  meteringMode: IntegerTagSchema,
  flash: IntegerTagSchema,
  whiteBalance: IntegerTagSchema,
});

export type ProcessedExifTags = z.infer<typeof ProcessedExifTagsSchema>;
