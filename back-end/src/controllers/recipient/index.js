import { f_create_recipient } from '../../services/recipient/index.js';

import { f_get_all_recipients } from '../../services/recipient/index.js';

export const create = async (req, res) => {
  const { name, email, phone, preferences } = req.body;
  try {
    const response = await f_create_recipient({ name, email, phone, preferences });
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const get_all = async (req, res) => {
  try {
    const recipients = await f_get_all_recipients();
    res.status(200).json(recipients);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
