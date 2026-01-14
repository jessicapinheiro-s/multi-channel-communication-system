import z from "zod";

export const createWarningSentLogSchema = z.object({
    user_id: z.number(),
    warningId: z.number(),
    channel: z.enum(["email", "sms"]),
});

export const getByIdWarningSentLogSchema = z.object({
    id: z.number()
})
