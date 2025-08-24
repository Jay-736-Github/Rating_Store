import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";
import { loginUser } from "../services/auth.service.js";

export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newUser = await createUser(req.body);
    res.status(201).json({
      message: "User created successfully!",
      user: newUser,
    });
  } catch (error) {

    if (error.message.includes("already exists")) {
      return res.status(409).json({ message: error.message });
    }
    res.status(500).json({ message: "Something went wrong on our end." });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { user, token } = await loginUser(req.body);
    res.status(200).json({
      message: "Login successful!",
      user,
      token,
    });
  } catch (error) {
    if (error.message.includes("Invalid")) {
      return res.status(401).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Something went wrong on our end." });
  }
};
