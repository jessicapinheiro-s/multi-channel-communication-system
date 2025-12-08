import bcrypt from "bcryptjs";
import prisma from "../../config/prisma.js";
import { generate_jwt_token } from "@/utils/utils.js";

export const f_login_validate = async ({ email, password }) => {
  const exists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!exists) {
    throw new Error("User does not exist");
  }

  const isValidPassword = await bcrypt.compare(password, exists.password);
  if (!isValidPassword) {
    throw new Error("Invalid password");
  }
  const user_payload = {
    id: exists.id,
    email: exists.email,
    role: exists.role,
  };
  const secret = process.env.JWT_TOKEN;

  if(!secret) {
    throw new Error("JWT secret not defined");
  }

  const token = generate_jwt_token(user_payload, secret, "1h");

  return token ? {token} : null;
};

export const f_create_user_auth = async ({ name, email, password, phone, user_preferences }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const exists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (exists) {
    throw new Error("User already exists");
  }

  const user_created =  await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      role: "user",
      warnings_preferences:user_preferences
    },
  });

  return user_created;
};

export const f_logout_user_auth = async ({ id_user }) => {};
