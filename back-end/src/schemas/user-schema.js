import { normalizeName, normalizePhone } from "../utils/normalize.js";
import z from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(6, "Nome deve ter pelo menos 6 caracteres")
    .transform(normalizeName),
  email: z.email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  phone: z.string().optional().transform(normalizePhone),
  user_preferences: z.array(z.string()).optional(),
});

export const updateUserSchema = z.object({
  id: z.number(),
  item_data: z.object({
    name: z
      .string()
      .min(6, "Nome deve ter pelo menos 6 caracteres")
      .transform(normalizeName),
    email: z.email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    phone: z.string().optional().transform(normalizePhone),
    user_preferences: z.array(z.string()).optional(),
  }),
});
