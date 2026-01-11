import z from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  phone: z.string().optional(),
  user_preferences: z.array(z.string()).optional(),
});

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