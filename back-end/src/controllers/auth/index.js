import { create_user } from "../../services/user";

const login = async (req, res) => {
  try {
  } catch (error) {
    return res.status(4001).json({ error: error.message });
  }
};
const register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    
  } catch (error) {
    return res.status(4001).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
  } catch (error) {
    return res.status(4001).json({ error: error.message });
  }
};
