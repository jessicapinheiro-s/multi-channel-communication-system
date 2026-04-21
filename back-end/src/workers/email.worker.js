import prisma from "../config/prisma";
import { emailQueue } from "../queues/email.queue";
import { f_send_by_email } from "../services/send-by-email";

emailQueue.process(5, async (job) => {
  const {
    to_email,
    to_name,
    subject,
    message,
    from_email,
    recipient_id,
    from_name,
    warning_id,
  } = job.data;

  try {
    await prisma.warning_logs_sent.create({
      data: {
        channel: "email",
        status: "created",
        user_id: recipient_id,
        warningId: warning_id,
      },
    });

    await f_send_by_email({
      to_email,
      to_name,
      subject,
      message,
      from_email,
      recipient_id,
      from_name,
      warning_id,
    });

    await prisma.warnings.update({
      where: {
        id: warning_id,
      },
      data: {
        status: "sent sucessfully",
      },
    });
  } catch (error) {
    await prisma.warnings.update({
      where: {
        id: warning_id,
      },
      data: {
        status: "sent with failures",
      },
    });
    throw error;
  }
});
