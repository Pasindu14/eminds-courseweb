import { z } from "zod";

const courseSchema = z.object({
  auto_id: z.number().optional(),
  course_code: z.string().min(2).max(50),
  course_name: z.string().min(2).max(500),
});

export default courseSchema;
