import prisma from "../../config/prisma.js";

export const create_user = async ({ name, email, password, phone, warning_preference }) => {
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
      password: password,
      phone: phone,
      warnings_preferences: warning_preference
    },
  });
};

export const delete_user = async ({ id_user }) => {
  const exists = await prisma.user.findUnique({
    where: {
      id: id_user,
    },
  });

  if (!exists) {
    throw new Error("User does not exist");
  }

  return await prisma.user.delete({
    where: {
      id: id_user,
    },
  });
};

export const update_user = async ({ id_user, item_info }) => {
  const exists = await prisma.user.findUnique({
    where: {
      id: id_user,
    }
  });

  if (!exists) {
    throw new Error("User does not exist");
  }

  return await prisma.user.update({
    where: {
      id: id_user,
    },
    data: {
      ...item_info,
    },
  });
};

export const get_by_email = async ({ email }) => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

export const get_by_id = async ({ user_id }) => {
  return await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });
};
