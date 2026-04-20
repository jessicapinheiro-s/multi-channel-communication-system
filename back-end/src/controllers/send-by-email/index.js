import { f_send_by_email } from "../../services/send-by-email/index.js";
import { successResponse } from "../../utils/apiResponse.js";

export const send_email = async (req, res) => {
  const {
    to_email,
    to_name,
    subject,
    message,
    recipient_id,
    from_email,
    from_name,
    warning_id,
  } = req.body;

  const response = await f_send_by_email({
    to_email,
    to_name,
    subject,
    message,
    recipient_id,
    from_email,
    from_name,
    warning_id,
  });
  return successResponse(res, response);
};
