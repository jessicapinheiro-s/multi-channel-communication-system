import { create_user_auth, login_validate } from "../../services/auth/auth-services";
import { create_user } from "../../services/user";

const login = async (req, res) => {
  try {
    await login_validate(req.body);
  } catch (error) {
    return res.status(4001).json({ error: error.message });
  }
};
const register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    await create_user_auth({name, email, password, phone});
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
