import { z } from "zod";

const sessionSchema = z.object({
  session_auto_id: z.number().optional(),
  title: z.string().min(2).max(500),
  zoom_link: z.string().url().optional(), // Assuming the zoom link is a URL
  zoom_password: z.string().min(5).max(50).optional(),
  batch_auto_id: z.string().min(1, { message: "Batch code is required" }),
  course_auto_id: z.string().min(1, { message: "Course code is required" }),
  slide_extension: z.string().max(20).optional(),
  file: z
    .any()
    .refine((data: any) => data instanceof FileList && data.length > 0, {
      message: "No file selected",
    }),
});

export const sessionUpdateSchema = z.object({
  session_auto_id: z.number().optional(),
  zoom_link: z.string().url().optional(), // Assuming the zoom link is a URL
});

export default sessionSchema;
