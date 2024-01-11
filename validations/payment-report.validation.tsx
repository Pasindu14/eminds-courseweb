import { z } from "zod";

export const paymentReportSchema = z.object({
  batch_auto_id: z.string().optional(),
  course_auto_id: z.string().optional(),
});
