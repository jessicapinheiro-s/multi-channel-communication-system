import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token_base = process.env.JWT_TOKEN;

  if (!token_base) {
    return res.status(500).json({ error: "Internal server error" });
  }

  try {
    const auth_header = req.header.authorization;
    const token_info = auth_header.split(" ");

    if (token_info[0] !== "Bearer" && !token_info[1]) {
      return res.status(401).json({ error: "Acesso negado. Token ausente." });
    }

    const token = token_info[1];
    const decoded = jwt.verify(token, token_base);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(4001).json({ error: error.message });
  }
};
