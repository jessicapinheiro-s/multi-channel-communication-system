import { f_send_by_sms } from "../../services/send-by-sms/index.js";

export const sendBySMS = async (req, res) => {
  const { message, destination_number } = await req.body;

  if (!message || !destination_number || destination_number < 12) {
    return res.status(400).json({ error: "Some data is missing" });
  }

  try {
    const response = await f_send_by_sms(destination_number, message);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: "" });
  }
};
