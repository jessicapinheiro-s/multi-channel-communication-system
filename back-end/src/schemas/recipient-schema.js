import z from "zod";

export const createRecipientSchema = z.object({
    name: z.string().min(6), 
    email: z.email(), 
    phone: z.number(), 
    preferences: z.enum(["email", "sms"])
})
