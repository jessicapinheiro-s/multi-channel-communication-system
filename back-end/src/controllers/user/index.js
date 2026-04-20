import {
  f_create_user,
  f_delete_user,
  f_update_user,
  f_get_by_id,
  f_get_by_email,
} from "../../services/user/index.js";
import { successResponse } from "../../utils/apiResponse.js";

export const create = async (req, res) => {
  const { name, email, password, phone, warning_preference } = req.body;
  const response = await f_create_user({
    name,
    email,
    password,
    phone,
    warning_preference,
  });
  return successResponse(res, response, 201);
};

export const update = async (req, res) => {
  const { id, item_data } = req.body;

  const response = await f_update_user({
    id_user: id,
    item_info: item_data,
  });
  return successResponse(res, response);
};

export const delete_item = async (req, res) => {
  const { id } = req.body;
  const response = await f_delete_user({
    id_user: id,
  });
  return successResponse(res, response);
};

export const get_user_by_email = async (req, res) => {
  const { email } = req.body;
  const response = await f_get_by_email({
    email,
  });
  return successResponse(res, response);
};

export const get_user_by_id = async (req, res) => {
  const { id } = req.body;
  const response = await f_get_by_id({
    user_id: id,
  });

  return successResponse(res, response);
};
