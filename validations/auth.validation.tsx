import { z } from "zod";

const authSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export default authSchema;
