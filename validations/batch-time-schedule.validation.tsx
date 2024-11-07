import { z } from "zod";

const batchTimeScheduleSchema = z.object({
  auto_id: z.number().optional(),
  course_auto_id: z.string().optional(),
  batch_auto_id: z.string().min(1, { message: "Batch is required" }),
  dates: z
    .date()
    .array()
    .refine((dates) => dates.length > 0, "Dates array must not be empty"),
});

export const batchTimeScheduleFilterSchema = z.object({
  batchId: z.string().optional(),
});

export default batchTimeScheduleSchema;
