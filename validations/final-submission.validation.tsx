import { z } from "zod";

const finalSubmissionSchema = z.object({
  link: z.string().url({ message: "Invalid URL format for link" }),
});

export const finalSubmissionFilterSchema = z.object({
  batchId: z.string().min(1, { message: "Batch code is required" }),
});

export default finalSubmissionSchema;
