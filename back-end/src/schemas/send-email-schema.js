import { normalizeName } from "@/utils/normalize";
import z from "zod";

export const sendEmailSchema = z.object({
  to_email: z.email(),
  to_name: z.string().min(6).transform(normalizeName),
  subject: z.string(),
  message: z.string(),
  recipient_id: z.number(),
  from_email: z.email(),
  from_name: z.string().min(6).transform(normalizeName),
  warning_id: z.number(),
});
