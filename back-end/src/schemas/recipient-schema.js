import { normalizeName, normalizePhone } from "../utils/normalize.js";
import z from "zod";

export const createRecipientSchema = z.object({
    name: z.string().min(6).transform(normalizeName), 
    email: z.email("Invalid email"), 
    phone: z.string().transform(normalizePhone), 
    preferences: z.enum(["email", "sms"])
})
