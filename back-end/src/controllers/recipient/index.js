import { f_create_recipient } from "../../services/recipient/index.js";

import { f_get_all_recipients } from "../../services/recipient/index.js";
import { successResponse } from "../../utils/apiResponse.js";

export const create = async (req, res) => {
  const { name, email, phone, preferences } = req.body;
  const response = await f_create_recipient({
    name,
    email,
    phone,
    preferences,
  });
  return successResponse(res, response, 201);
};

export const get_all = async (req, res) => {
  const response = await f_get_all_recipients();
  return successResponse(res, response);
};
