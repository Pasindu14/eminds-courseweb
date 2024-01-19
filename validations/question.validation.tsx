import * as z from "zod";

const questionSchema = z.object({
  question_auto_id: z.number().optional(), // Auto-incremented field, optional for new entries
  course_code: z.string().min(1, { message: "Please select a course" }), // Assuming course_code is a positive integer
  batch_code: z.string().min(1, { message: "Please select a course" }), // Assuming batch_code is a positive integer
  exam_code: z.string().min(1, { message: "Please select a course" }), // Assuming exam_code is a positive integer
  question: z.string().min(1), // Non-empty string
  answer_01: z.string().min(1), // Non-empty string
  answer_02: z.string().min(1), // Non-empty string
  answer_03: z.string().min(1), // Non-empty string
  answer_04: z.string().min(1), // Non-empty string
  correct_answer: z.string().min(1), // Nullable and optional
});

export default questionSchema;
