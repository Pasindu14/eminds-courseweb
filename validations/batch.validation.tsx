import { z } from "zod";

const batchSchema = z.object({
  auto_id: z.number().optional(),
  batch_no: z.string().min(2).max(50),
  batch_name: z.string().min(2).max(500),
  zoom_link: z.string().optional(),
  course_auto_id: z.string(),
  start_date: z.string().refine(
    (date) => {
      return /^\d{4}-\d{2}-\d{2}$/.test(date);
    },
    {
      message: "Invalid start date format (YYYY-MM-DD)",
    }
  ),
  end_date: z.string().refine(
    (date) => {
      return /^\d{4}-\d{2}-\d{2}$/.test(date);
    },
    {
      message: "Invalid end date format (YYYY-MM-DD)",
    }
  ),
  status: z.number(),
  password: z.string().min(5).max(50),
  price: z.coerce // SOLUTION
    .number()
    .min(1),
});

export default batchSchema;
