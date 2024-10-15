import { title } from "process";
import { z } from "zod";

const specialSessionSchema = z.object({
  auto_id: z.number().optional(),
  course_auto_id: z.string().optional(),
  title: z.string().min(5),
  video_link: z.string().url(),
  batches: z.string().array().nonempty({ message: "Batches are required" }),
});

export const specialSessionFilterSchema = z.object({
  batchId: z.string(),
});

export default specialSessionSchema;
