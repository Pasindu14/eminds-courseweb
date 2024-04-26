import { z } from "zod";

const studentSchema = z.object({
  auto_id: z.number().nullable().optional(),
  name: z.string().min(2).max(500),
  phoneNumber: z.string().min(5).max(20),
  address: z.string().min(2).max(500),
  nic: z.string().optional(),
  email: z.string().email(),
  birthDay: z.string().refine(
    (value) => {
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      return datePattern.test(value);
    },
    {
      message: "Invalid date format (YYYY-MM-DD)",
    }
  ),
});

export const studentPasswordSchema = z.object({
  oldPassword: z.string().min(5).max(50),
  confirmPassword: z.string().min(5).max(50),
  password: z.string().min(5).max(50),
});

export default studentSchema;
