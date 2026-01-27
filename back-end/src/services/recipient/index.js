import prisma from '../../config/prisma.js';

export const f_create_recipient = async ({ name, email, phone, preferences }) => {
  if (!email) throw new Error('Email is required');
  // check duplicate
  const existsEmail = await prisma.recipient.findFirst({ 
    where: { 
      email 
    } 
  });

  const existsPhone = await prisma.recipient.findFirst({
    where: {
      phone
    }
  });


  if (existsEmail) throw new Error('Recipient with this email already exists');
  if (existsPhone) throw new Error('Recipient with this phone number already exists');
  // cast data to any to avoid TypeScript errors in editor until Prisma Client is regenerated
  const createData = /** @type {any} */ ({
    name: name || null,
    email,
    phone: phone || null,
    preferences: preferences || null,
  });

  const recipient = await prisma.recipient.create({ data: createData });
  return recipient;
};

export const f_get_all_recipients = async () => {
  const recipients = await prisma.recipient.findMany();
  return recipients;
};
