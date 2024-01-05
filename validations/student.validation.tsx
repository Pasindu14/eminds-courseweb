import { z } from "zod";

const studentSchema = z.object({
  auto_id: z.number().optional(),
  name: z.string().min(2).max(500),
  phoneNumber: z.string().min(10).max(10),
  address: z.string().min(2).max(500),
  nic: z.string().min(6).max(20),
  email: z.string().email(),
  birthDay: z.string().refine(
    (value) => {
      // Use a regular expression to validate the format (YYYY-MM-DD)
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      return datePattern.test(value);
    },
    {
      message: "Invalid date format (YYYY-MM-DD)",
    }
  ),
});

export default studentSchema;
