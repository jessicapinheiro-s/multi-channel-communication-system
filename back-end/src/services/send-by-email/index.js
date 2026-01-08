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
      htmlContent: message,
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

    //criar warning_log

    const response_warning_log = await fetch(
      `${ambiente}/warnings_logs/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: recipient_id,
          warningId: warning_id,
          channel: "email",
          // send ISO string; controller/service can parse to Date if needed
          sent_at: new Date().toISOString(),
        }),
      }
    );

    if (!response_warning_log.ok) {
      const text = await response_warning_log.text();
      console.error("Failed to create warning log:", text);
      throw new Error(`Falha ao crear wanrning log, ${response.status}`);
    }
  } catch (error) {}
};
