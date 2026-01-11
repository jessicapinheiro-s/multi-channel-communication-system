import z from "zod";

export const createWarningSchema = z.object({
  title: z.string().min(3),
  message: z.string().min(5),
  channel: z.enum(["sms", "email"]),
  status: z.enum(["created", "sent"])
});

export const updateWarningSchema = z.object({
  id: z.number(),
  itemInfo: {
    title: z.string().min(3),
    message: z.string().min(5),
    channel: z.enum(["sms", "email"]),
    status: z.enum(["created", "sent"])
  },
});

export const deleteWarningSchema = z.object({
    id: z.number()
})

export const getByIdWarningSchema = z.object({
    id: z.number()
})