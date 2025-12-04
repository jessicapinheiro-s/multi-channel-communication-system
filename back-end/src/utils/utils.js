import jwt from "jsonwebtoken";
export const generate_jwt_token = (payload, secret, expiresIn) => {
  const token = jwt.sign(
    {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      secret,
    },
    { expiresIn: expiresIn }
  );

  return token
};
