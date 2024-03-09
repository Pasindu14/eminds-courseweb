import { z } from "zod";

const badgeSchema = z.object({
  auto_id: z.number().optional(),
  course_auto_id: z.string().min(1, { message: "Course code is required" }),
  badge_type: z.string().min(1, { message: "Badge type is required" }),
  students: z.string().array().nonempty({ message: "Students are required" }),
  file: z
    .any()
    .refine((data: any) => data instanceof FileList && data.length > 0, {
      message: "No file selected",
    }),
});

export default badgeSchema;
