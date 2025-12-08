import z from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  phone: z.string().optional(),
  user_preferences: z.array(z.string()).optional(),
});

export const createWarningSchema = z.object({
    title: z.string(),
    message: z.string()
});

export const createWarningSentLogSchema = z.object({
    user_id: z.number(),
    warningId: z.number(),
    channel: z.string(),
    sent_at: z.date()
});

export const loginSchema = z.object({});

export const updateUserSchema = z.object({
  id: z.number(),
  item_data: {
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    phone: z.string().optional(),
    user_preferences: z.array(z.string()).optional(),
  },
});

export const deleteSchema = z.object({
    id: z.number()
});

export const getByEmail = z.object({
    email:  z.string().email("Email inválido")
});

export const getById = z.object({
    id: z.number()
});
