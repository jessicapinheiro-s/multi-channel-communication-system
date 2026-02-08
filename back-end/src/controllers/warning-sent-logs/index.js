import {
  f_create_warning_sent_log,
  f_get_all_warning_sent_logs,
  f_get_by_id_warning_log,
  f_update_warning_log
} from "../../services/warning-sent-logs/index.js";

export const create_warning_sent_log = async (req, res) => {
  const { user_id, warningId, channel, sent_at } = req.body;
  if (!user_id || !warningId || !channel) {
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
      const response = await f_get_by_id_warning_log({id: warning_id})
      return res.status(200).json(response);
    }catch (error) {
      throw new Error("Internal Server Error");
    }
}

export const update_warning_log_by_id = async(req, res) => {
  const {id, item_info} = await req.body;
  if(!id || !item_info) {
    return res.status(401).json({error: "Item's id or info are missing"});
  }
  
  try {
    const response = await f_update_warning_log({id, item_info});
    return res.status(201).json({message: `The warning log had been updated, ${response}`});
  } catch(error) {
    return res.status(401).json({error: 'An error had happened while updating the warning log'});
  }
}
