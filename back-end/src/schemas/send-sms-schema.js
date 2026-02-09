import z from "zod";

export const sendBySMSSchema = z.object({
    message: z.string(), 
    destination_number: z.array(z.number())
})