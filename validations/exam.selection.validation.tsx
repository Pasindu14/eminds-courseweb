import { z } from "zod";

const examSelectionSchema = z.object({
  exam_auto_id: z.string(),
});

export default examSelectionSchema;
