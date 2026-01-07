import prisma from "../../config/prisma.js";

export const f_create_warning = async ({ status, message, title }) => {
  if (!message) {
    throw new Error("Message is required to create a warning.");
  }
  try {
    const response = await prisma.warnings.create({
      data: {
        status: status ? status : "pending",
        message: message,
        name: title
      },
    });
    return response;
  } catch (error) {
    throw new Error("Error creating warning: " + error.message);
  }
};

export const f_delete_warning = async ({ id }) => {
  if (!id) {
    throw new Error("id is required to create a warning.");
  }
  try {
    const response = await prisma.warnings.delete({
      where: {
        id: id,
      },
    });
    return response;
  } catch (error) {
    throw new Error("Error deleting warning: " + error.message);
  }
};

export const f_update_warning = async ({ id, item_info }) => {
  if (!id || !item_info) {
    throw new Error("id and item_info is required to create a warning.");
  }
  try {
    const response = await prisma.warnings.update({
      where: {
        id: id,
      },
      data: item_info,
    });
    return response;
  } catch (error) {
    throw new Error("Error updating warning: " + error.message);
  }
};

export const f_get_by_id_warning = async ({ id }) => {
  if (!id) {
    throw new Error("id is required to create a warning.");
  }
  try {
    const response = await prisma.warnings.findUnique({
      where: {
        id: id,
      },
    });
    return response;
  } catch (error) {
    throw new Error("Error geting warning by Id: " + error.message);
  }
};

export const f_get_all_warnings = async () => {
  try {
    const response = await prisma.warnings.findMany();
    return response;
  } catch (error) {
    throw new Error("Error geting all warning sent logs: " + error.message);
  }
}
