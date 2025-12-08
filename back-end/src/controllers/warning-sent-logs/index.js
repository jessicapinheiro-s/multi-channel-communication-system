import {
  f_create_warning_sent_log,
  f_get_all_warning_sent_logs,
} from "@/services/warning-sent-logs";

export const create_warning_sent_log = async (req, res) => {
  const { user_id, warningId, channel, sent_at } = req.body;
  if (!user_id || !warningId || !channel || !sent_at) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const response = await f_create_warning_sent_log({
      user_id,
      warningId,
      channel,
      sent_at,
    });

    if (!response) {
      return res
        .status(500)
        .json({ error: "Could not create warning sent log" });
    }

    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const get_all_warning_sent_logs = async (req, res) => {
  try {
    const response = await f_get_all_warning_sent_logs();

    if (!response) {
      return res
        .status(401)
        .json({ error: "Could not fetch warning sent logs" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const get_waning_by_warning_id = async(req, res) => {
    const { warning_id } = req.params;

    if(!warning_id) {
        return res.status(400).json({ error: "Missing warning_id parameter" });
    }
    try {

    }catch (error) {

    }
}
