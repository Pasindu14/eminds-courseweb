import { z } from "zod";

export const sessionProgressSchema = z.object({
  session_progress_auto_id: z.number().optional(),
  title: z
    .string()
    .min(5, { message: "Title must be at least 2 characters." })
    .max(500),
  is_completed: z.number().int().min(0).max(1).optional().default(0), // Assuming 0 for not completed, 1 for completed
  batch_auto_id: z.string().min(1, { message: "Batch code is required" }),
  course_auto_id: z.string().min(1, { message: "Course code is required" }),
});

export const sessionProgressFilterSchema = z.object({
  courseAutoId: z.string().min(1, { message: "Course code is required" }),
  batchId: z.string().min(1, { message: "Batch code is required" }),
});
