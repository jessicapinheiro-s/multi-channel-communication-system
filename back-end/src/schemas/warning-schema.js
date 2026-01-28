import z from "zod";

export const createWarningSchema = z.object({
  title: z.string().min(6),
  message: z.string().min(10),
  channel: z.enum(["sms", "email"]),
  status: z.enum(["created", "sent"])
});

export const updateWarningSchema = z.object({
  id: z.number(),
  itemInfo: z.object({
    title: z.string().min(6).optional(),
    message: z.string().min(10).optional(),
    channel: z.enum(["sms", "email"]).optional(),
    status: z.enum(["created", "sent", "sent with failures", "sent sucessfully"]).optional()
  }).optional(),
});

export const deleteWarningSchema = z.object({
    id: z.number()
})

export const getByIdWarningSchema = z.object({
    id: z.number()
})