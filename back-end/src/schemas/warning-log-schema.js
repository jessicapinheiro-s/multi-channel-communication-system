import z from "zod";

export const createWarningSentLogSchema = z.object({
  user_id: z.number(),
  warningId: z.number(),
  channel: z.enum(["email", "sms"]),
  status: z.enum(["sent", "failed to send"]),
});

export const getByIdWarningSentLogSchema = z.object({
  id: z.number(),
});

export const updateWarningLogByIdSchema = z.object({
  id: z.number(),
  item_info: {
    status: z.enum(["created", "sent", "failed to send"]),
  },
});
