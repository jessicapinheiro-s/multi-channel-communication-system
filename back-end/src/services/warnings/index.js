import prisma from "../../config/prisma.js";

export const f_create_warning = async ({ status, message, title, channel }) => {
  if (!message) {
    throw new Error("Message is required to create a warning.");
  }

  return await prisma.warnings.create({
    data: {
      status: status ? status : "pending",
      message: message,
      name: title,
      channel: channel,
    },
  });
};

export const f_delete_warning = async ({ id }) => {
  if (!id) {
    throw new Error("id is required to create a warning.");
  }
  return await prisma.warnings.delete({
    where: {
      id: id,
    },
  });
};

export const f_update_warning = async ({ id, item_info }) => {
  if (!id || !item_info) {
    throw new Error("id and item_info is required to create a warning.");
  }
  return await prisma.warnings.update({
    where: {
      id: id,
    },
    data: item_info,
  });
};

export const f_get_by_id_warning = async ({ id }) => {
  if (!id) {
    throw new Error("id is required to create a warning.");
  }
  return await prisma.warnings.findUnique({
    where: {
      id: id,
    },
  });
};

export const f_get_all_warnings = async () => {
  return await prisma.warnings.findMany();
};

export const f_send_warning = async ({ warning_id, channel, message }) => {
  if (!warning_id) {
    throw new Error("Warning id is missing");
  }
  const recipients = await prisma.recipient.findMany({
    where: {
      preferences: channel,
    },
  });

  if (recipients.length === 0)
    return "There is no recipient registeres for this channel type";
  let hasError;
  for (const recipient of recipients) {
    // @ts-ignore
    await queue.add("send-email", {
      to_email: recipient.email,
      to_name: recipient.name,
      from_email: "jessicasilva.js1314@gmail.com",
      message: message,
      from_name: "Sitema de Envio de Avisos",
      recipient_id: recipient.id,
      subject: "Administrador",
      warning_id: warning_id,
    });
  }

  
};
