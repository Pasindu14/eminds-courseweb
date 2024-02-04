import { z } from "zod";

// Function to return event schema with conditional image field
const createEventSchema = (isImageRequired: boolean) => {
  return z.object({
    event_auto_id: z.number().optional(),
    name: z
      .string()
      .min(2, { message: "Event name must be at least 2 characters long" })
      .max(500, { message: "Event name must be less than 500 characters" }),
    description: z
      .string()
      .min(5, { message: "Description must be at least 5 characters long" }),
    date: z.string().refine(
      (date) => {
        return /^\d{4}-\d{2}-\d{2}$/.test(date);
      },
      {
        message: "Invalid date format (YYYY-MM-DD)",
      }
    ),
    link: z.string().url({ message: "Invalid URL format for link" }),
    status: z.boolean(),
    created_at: z.string().optional(), // You might want to use z.date() if working with Date objects
    image: isImageRequired
      ? z
          .any()
          .refine((data: any) => data instanceof FileList && data.length > 0, {
            message: "No file selected",
          })
      : z.any().optional(),
  });
};

export default createEventSchema;
