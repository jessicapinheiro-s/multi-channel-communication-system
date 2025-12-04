import bcrypt from "bcryptjs";
import prisma from "../../config/prisma.js";

export const login_validate = async ({ email, password }) => {
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
  const token = generate_jwt_token();

  if (token) {
    return res
      .json({
        token,
      })
      .status(200)
      .json({
        message: "Login successful",
      });
  }

  return res
    .json({
      token,
    })
    .status(500)
    .json({
      message: "Login unsuccessful",
    });
};

export const create_user_auth = async ({ name, email, password, phone }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const exists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (exists) {
    throw new Error("User already exists");
  }

  return await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
    },
  });
};


export const logout_user_auth = async ({ id_user }) => {
  
}