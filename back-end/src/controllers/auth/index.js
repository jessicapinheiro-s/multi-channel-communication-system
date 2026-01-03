import { f_create_user_auth, f_login_validate } from "../../services/auth/auth-services";

export const login = async (req, res) => {

  if(!req?.body) {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    const response = await f_login_validate(req.body);
    return res
    .status(200)
    .cookie(
      "token", response.token, {
        httpOnluy: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 
      }
    )
    .json(response)
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  if(!req?.body) {
    return res.status(400).json({ error: "Invalid request" });
  }
  const { name, email, password, phone, user_preferences } = req.body;
  try {
    const response = await f_create_user_auth({name, email, password, phone,  user_preferences});
    return res.status(200).json(response)

  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    return res
    .status(200)
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .json({
      message: "Logout successful"
    })
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};
