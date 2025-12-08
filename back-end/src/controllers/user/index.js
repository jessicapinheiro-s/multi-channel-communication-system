import {
  f_create_user,
  f_delete_user,
  f_update_user,
  f_get_by_id,
  f_get_by_email,
} from "../../services/user";

export const create = async (req, res) => {
  const { name, email, password, phone, warning_preference } = req.body;
  try {
    const response = await f_create_user({
      name,
      email,
      password,
      phone,
      warning_preference
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  const { id, item_data } = req.body;
  try {
    const response = await f_update_user({
      id_user: id,
      item_info: item_data,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const delete_item = async (req, res) => {
  const { id } = req.body;
  try {
    const response = await f_delete_user({
      id_user: id,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const get_user_by_email = async (req, res) => {
  const { email } = req.body;
  try {
    const response = await f_get_by_email({
      email,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const get_user_by_id = async (req, res) => {
  const { id } = req.body;
  try {
    const response = await f_get_by_id({
      user_id: id,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
