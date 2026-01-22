import prisma from "../../config/prisma";

const BREVO_URL = process.env.BREVO_URL;
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const ambiente = process.env.DATABASE_URL;

export const f_send_by_email = async (data) => {
  const {
    to_email,
    to_name,
    subject,
    message,
    recipient_id,
    from_email,
    from_name,
    warning_id,
  } = data;

  if (
    !to_email ||
    !to_name ||
    !subject ||
    !message ||
    !recipient_id ||
    !from_email ||
    !from_name ||
    !warning_id
  ) {
    throw new Error("Algum dado obrigatório está faltando estão faltando");
  }

  const template = await prisma.templates_email.findFirst({
    where: {
      name: 'Aviso Padrão Principal'
    },
  });

  if(!template) {
    throw new Error('Email template not found');
  }

  const template_content = (template.body).toString().replace('{{nome}}', to_name).replace('{{titulo}}', '').replace('{{texto}}', message).toString();
  
  try {
    const body_to_send = {
      sender: {
        name: from_name,
        email: from_email,
      },
      to: [
        {
          email: to_email,
          name: to_name,
        },
      ],
      subject: subject,
      htmlContent: template_content,
    };

    const response = await fetch(`${BREVO_URL}/email`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify(body_to_send),
    });

    if (!response.ok) {
      throw new Error(`Erro ao tentar enviar o e-mail, ${response.status}`);
    }

    
  } catch (error) {}
};
