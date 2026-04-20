import {
  f_create_warning,
  f_delete_warning,
  f_get_all_warnings,
  f_get_by_id_warning,
  f_update_warning,
} from "../../services/warnings/index.js";
import { successResponse } from "../../utils/apiResponse.js";

export const create_warning = async (req, res) => {
  // Accept either `title` or `name` from the client. Older clients may send `name`.
  const { status, message, title, channel } = req.body;

  const response = await f_create_warning({ status, message, title, channel });
  return successResponse(res, response, 201);
};

export const delete_warning = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Missing id parameter" });
  }

  const response = await f_delete_warning({ id });
  return successResponse(res, response);
};

export const update_warning = async (req, res) => {
  const { id, itemInfo } = req.body;

  if (!id || !itemInfo) {
    return res
      .status(400)
      .json({ error: "Missing id or itemInfo in request body" });
  }
  const response = await f_update_warning({ id, item_info: itemInfo });
  return successResponse(res, response);
};

export const get_by_id_warning = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Missing id parameter" });
  }

  const response = await f_get_by_id_warning({ id });
  return successResponse(res, response);
};

export const get_all_warnings = async (req, res) => {
  const response = await f_get_all_warnings();
  return successResponse(res, response);
};
