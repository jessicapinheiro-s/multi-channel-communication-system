import { f_send_by_sms } from "../../services/send-by-sms/index.js";
import { successResponse } from "../../utils/apiResponse.js";

export const sendBySMS = async (req, res) => {
  const { message, destination_number } = await req.body;

  const response = await f_send_by_sms(destination_number, message);
  return successResponse(res, response);
};
