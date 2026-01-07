import {
  f_create_warning,
  f_delete_warning,
  f_get_all_warnings,
  f_get_by_id_warning,
  f_update_warning,
} from "../../services/warnings/index.js";

export const create_warning = async (req, res) => {
  // Accept either `title` or `name` from the client. Older clients may send `name`.
  const { status, message } = req.body;
  const title = req.body.title ?? req.body.name ?? '';

  if (!message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await f_create_warning({ status, message, title });
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const delete_warning = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Missing id parameter" });
  }

  try {
    const response = await f_delete_warning({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const update_warning = async (req, res) => {
  const { id } = req.params;
  const item_info = req.body;

  if (!id) {
    return res.status(400).json({ error: "Missing id parameter" });
  }

  try {
    const response = await f_update_warning({ id, item_info });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const get_by_id_warning = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Missing id parameter" });
  }
  try {
    const response = await f_get_by_id_warning({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const get_all_warnings = async (req, res) => {
   try {
      const response = await f_get_all_warnings();
  
      if (!response) {
        return res
          .status(401)
          .json({ error: "Could not fetch warningss" });
      }
  
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
}
