import { z } from "zod";

export const paymentSchema = z.object({
  batch_auto_id: z.string().min(1, { message: "Batch code is required" }),
  course_auto_id: z.string().optional(),
  amount: z.coerce // SOLUTION
    .number()
    .min(1),
  students: z.string().array().nonempty({ message: "Students are required" }),
});

export const paymentFilterSchema = z.object({
  studentMapping: z
    .string()
    .array()
    .nonempty({ message: "Students are required" }),
});

export const studentPaymentSchema = z.object({
  amount: z.coerce.number().min(1),
  file: z
    .any()
    .refine((data: any) => data instanceof FileList && data.length > 0, {
      message: "No file selected",
    }),
});
