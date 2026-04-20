import {
  f_create_warning_sent_log,
  f_get_all_warning_sent_logs,
  f_get_by_id_warning_log,
  f_update_warning_log,
} from "../../services/warning-sent-logs/index.js";
import { successResponse } from "../../utils/apiResponse.js";

export const create_warning_sent_log = async (req, res) => {
  const { user_id, warningId, channel, sent_at } = req.body;
  
  const response = await f_create_warning_sent_log({
    user_id,
    warningId,
    channel,
    sent_at,
  });

  return successResponse(res, response, 201);
};

export const get_all_warning_sent_logs = async (req, res) => {
  const response = await f_get_all_warning_sent_logs();
  return successResponse(res, response);
};

export const get_waning_by_warning_id = async (req, res) => {
  const { warning_id } = req.params;
  
  const response = await f_get_by_id_warning_log({ id: warning_id });
  return successResponse(res, response);
};

export const update_warning_log_by_id = async (req, res) => {
  const { id, item_info } = req.body;

  const response = await f_update_warning_log({ id, item_info });
  return successResponse(res, response);
};
