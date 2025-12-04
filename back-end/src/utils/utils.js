import jwt from "jsonwebtoken";

/**
 * Generate a JWT token
 * @param {{id: any, email?: string, role?: any}} payload
 * @param {string} secret
 * @param {string|number} expiresIn
 * @returns {string}
 */
export const generate_jwt_token = (payload, secret, expiresIn) => {
  // jwt.sign(payload, secretOrPrivateKey, [options])
  const token = jwt.sign(
    {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    },
    secret,
    /** @type {any} */ ({ expiresIn })
  );

  return token;
};
