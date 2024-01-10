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
  students: z.string().array().nonempty({ message: "Students are required" }),
});
