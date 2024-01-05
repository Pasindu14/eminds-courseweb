import { z } from "zod";

const jobSchema = z.object({
  auto_id: z.number().optional(),
  title: z.string().min(2).max(5000),
  expire_date: z.string().refine(
    (date) => {
      // Use a regular expression to validate the format (YYYY-MM-DD)
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      return datePattern.test(date);
    },
    {
      message: "Invalid date format (YYYY-MM-DD)",
    }
  ),
  link: z.string().url(),
  status: z.number(), // or z.enum([...]) if status has specific enumerable values
});

export default jobSchema;
