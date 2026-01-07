import { f_create_recipient } from '../../services/recipient/index.js';

export const create = async (req, res) => {
  const { email, phone, preferences } = req.body;
  try {
    const response = await f_create_recipient({ email, phone, preferences });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
