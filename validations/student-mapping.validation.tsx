import { z } from "zod";

const studentMappingSchema = z.object({
  auto_id: z.number().optional(),
  course_auto_id: z.string().optional(),
  batch_auto_id: z.string(),
  block_status: z.number(),
  students: z.string().array().nonempty({ message: "Students are required" }),
});

export const studentMappingFilterSchema = z.object({
  batchId: z.string().optional(),
});

export default studentMappingSchema;
