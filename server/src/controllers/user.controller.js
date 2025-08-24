import { getUserById } from "../services/user.service.js";
import { validationResult } from "express-validator"; 
import { createUserByAdmin } from "../services/user.service.js";
import { updateUserPassword as updateUserPasswordService } from "../services/user.service.js";


export const getMyProfile = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong on our end." });
  }
};

export const adminCreateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newUser = await createUserByAdmin(req.body);
    res.status(201).json({
      message: "User created successfully by admin!",
      user: newUser,
    });
  } catch (error) {
    if (error.message.includes("already exists")) {
      return res.status(409).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Something went wrong on our end." });
  }
};

export const updatePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    await updateUserPasswordService(userId, oldPassword, newPassword);

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    if (error.message.includes("Incorrect old password")) {
      return res.status(401).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Something went wrong on our end." });
  }
};
