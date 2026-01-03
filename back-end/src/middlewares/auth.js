import jwt from "jsonwebtoken";
import { ZodError } from "zod";

import {
  createUserSchema,
  createWarningSchema,
  createWarningSentLogSchema,
  loginSchema,
  updateUserSchema,
  deleteSchema,
  getByEmail,
  getById,
} from "../schemas/index.js";

/* ======================================================
   AUTH
====================================================== */

export const auth = (req, res, next) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({ error: "Internal server error" });
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Token não informado" });
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ error: "Token mal formatado" });
    }

    req.user = jwt.verify(token, secret);
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};

/* ======================================================
   ROLE
====================================================== */

export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Não autenticado" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Acesso restrito a administradores" });
  }

  next();
};

/* ======================================================
   ZOD VALIDATOR (genérico)
====================================================== */

const validate = (schema, property = "body") => {
  return (req, res, next) => {
    try {
      schema.parse(req[property]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          // @ts-ignore
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }

      return res.status(400).json({ error: "Invalid data" });
    }
  };
};

/* ======================================================
   VALIDATIONS (EXPORTÁVEIS)
====================================================== */

// AUTH
export const validateLogin = validate(loginSchema);

// USER
export const validateCreateUser = validate(createUserSchema);
export const validateUpdateUser = validate(updateUserSchema);
export const validateDeleteUser = validate(deleteSchema);
export const validateGetUserById = validate(getById);
export const validateGetUserByEmail = validate(getByEmail);

// WARNING
export const validateCreateWarning = validate(createWarningSchema);
export const validateCreateWarningSentLog = validate(
  createWarningSentLogSchema
);
