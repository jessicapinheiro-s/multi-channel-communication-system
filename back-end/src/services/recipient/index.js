import prisma from '../../config/prisma.js';

export const f_create_recipient = async ({ email, phone, preferences }) => {
  if (!email) throw new Error('Email is required');
  const recipient = await prisma.recipient.create({
    data: {
      email,
      phone: phone || null,
      preferences: preferences || null,
    }
  });
  return recipient;
};
