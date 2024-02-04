import { z } from "zod";

const examSchema = z.object({
  exam_auto_id: z.number().optional(),
  batch_code: z.string().min(1, { message: "Batch code is required" }),
  course_code: z.string().min(1, { message: "Course code is required" }),
  exam_code: z.string().min(3).max(500),
});

export const examResultsilterSchema = z.object({
  courseId: z.string().min(1, { message: "Course code is required" }),
  batchId: z.string().min(1, { message: "Batch code is required" }),
  examId: z.string().min(1, { message: "Exam code is required" }),
});

export default examSchema;
