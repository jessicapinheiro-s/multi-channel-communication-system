import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({ error: "Internal server error" });
  }

  try {
    const authToken = req.cookies?.token;
    if (!authToken) {
      return res.status(401).json({ error: "Token não informado" });
    }

    req.user = jwt.verify(authToken, secret);
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Não autenticado" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Acesso restrito a administradores" });
  }

  next();
};

