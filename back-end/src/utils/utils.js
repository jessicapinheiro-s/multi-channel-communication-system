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

export function formatName(name) {
  const arr_name = name.split(" ");

  if (arr_name.length === 0) {
    return arr_name[0]
      .charAt(0)
      .toLocaleUpperCase()
      .concat(arr_name[0].slice(1));
  } else {
    return arr_name.map((name, index) => {
      let name_formated = name
        .charAt(0)
        .toLocaleUpperCase()
        .concat(name.slice(1));

      if (index + 1 !== arr_name.length) {
        name_formated = name_formated.concat(" ");
      }

      return name_formated;
    });
  }
}