import { Router } from "express";
import { body } from "express-validator";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/roles.js"; 
import {
  getMyProfile,
  adminCreateUser,
  updatePassword,
} from "../controllers/user.controller.js"; 

const router = Router();

router.get("/me", auth, getMyProfile); 

const adminCreateUserValidation = [
  body("name")
    .trim()
    .isLength({ min: 5, max: 60 })
    .withMessage("Name must be between 5 and 60 characters."),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email.")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be 8-16 characters."),
  body("address")
    .trim()
    .isLength({ max: 400 })
    .withMessage("Address cannot be more than 400 characters."),
  body("role")
    .isIn(["USER", "OWNER", "ADMIN"])
    .withMessage("Role must be one of: USER, OWNER, ADMIN."),
];


router.post(
  "/",
  auth,
  checkRole(["ADMIN"]),
  adminCreateUserValidation,
  adminCreateUser
);

const updatePasswordValidation = [
  body("oldPassword").notEmpty().withMessage("Old password is required."),
  body("newPassword")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be between 8 and 16 characters.")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/)
    .withMessage(
      "Password must contain at least one uppercase letter and one special character."
    ),
];

router.patch(
  "/me/password",
  auth, 
  updatePasswordValidation,
  updatePassword
);


export default router;
