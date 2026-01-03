import prisma from "../../config/prisma";

export const f_create_warning_sent_log = async ({
  user_id,
  warningId,
  channel,
  sent_at,
}) => {
  if (!user_id || !warningId || !channel) {
    throw new Error(
      "user_id, warningId, and channel are required to create a warning sent log."
    );
  }
  try {
    const response = await prisma.warning_logs_sent.create({
      data: {
        user_id: user_id,
        warningId: warningId,
        channel: channel,
        sent_at: sent_at ? sent_at : new Date(),
      },
    });
    return response;
  } catch (error) {
    throw new Error("Error creating warning sent log: " + error.message);
  }
};

export const f_delete_warning_log = async ({ id }) => {
  if (!id) {
    throw new Error("id is required to delete a warning sent log.");
  }
  try {
    const response = await prisma.warning_logs_sent.delete({
      where: {
        id: id,
      },
    });
    return response;
  } catch (error) {
    throw new Error("Error deleting warning sent log: " + error.message);
  }
};

export const f_update_warning_log = async ({ id, item_info }) => {
  if (!id || !item_info) {
    throw new Error(
      "id and item_info are required to update a warning sent log."
    );
  }
  try {
    const response = await prisma.warning_logs_sent.update({
      where: {
        id: id,
      },
      data: item_info,
    });
    return response;
  } catch (error) {
    throw new Error("Error updating warning sent log: " + error.message);
  }
};

export const f_get_by_id_warning_log = async ({ id }) => {
  if (!id) {
    throw new Error("id is required to delete a warning sent log.");
  }
  try {
    const response = await prisma.warning_logs_sent.findUnique({
      where: {
        id: id,
      },
    });
    return response;
  } catch (error) {
    throw new Error("Error geting by id warning sent log: " + error.message);
  }
};

export const f_get_all_warning_sent_logs = async () => {
  try {
    const response = await prisma.warning_logs_sent.findMany();
    return response;
  } catch (error) {
    throw new Error("Error geting all warning sent logs: " + error.message);
  }
};
