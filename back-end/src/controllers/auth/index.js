import {
  f_create_user_auth,
  f_login_validate,
  f_get_current_user,
} from "../../services/auth/auth-services.js";

export const login = async (req, res) => {
  if (!req?.body) {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    const { token, user } = await f_login_validate(req.body);
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // localhost
        path: "/",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60,
      })
      .json(user);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  if (!req?.body) {
    return res.status(400).json({ error: "Invalid request" });
  }
  const { name, email, password, phone, user_preferences } = req.body;
  try {
    const response = await f_create_user_auth({
      name,
      email,
      password,
      phone,
      user_preferences,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

export const me = async (req, res) => {
  const id = req.user?.id;

  if (!id) {
    throw new Error("User Id is missign on auth/me req");
  }
  try {
    const response = await f_get_current_user({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json("User not found");
  }
};
