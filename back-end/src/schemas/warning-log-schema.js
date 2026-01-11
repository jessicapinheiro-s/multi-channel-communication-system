import z from "zod";

export const createWarningSentLogSchema = z.object({
    user_id: z.number(),
    warningId: z.number(),
    channel: z.string(),
    sent_at: z.date()
});
