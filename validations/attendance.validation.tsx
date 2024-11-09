import { z } from "zod";

export const attendanceMarkingFilterSchema = z.object({
  batchId: z.string().min(1, { message: "Batch is required" }),
  batchTimeScheduleId: z
    .string()
    .min(1, { message: "Batch schedule is required" }),
});

export const attendanceFilterSchema = z.object({
  courseId: z.string().optional(),
  batchId: z.string().min(1, { message: "Batch is required" }),
});

export default attendanceMarkingFilterSchema;
