import { Router } from "express";
import { body } from "express-validator";
import { signup, login } from "../controllers/auth.controller.js";

const router = Router();

const signupValidationRules = [
  body("name")
    .trim()
    .isLength({ min: 5, max: 60 })
    .withMessage("Name must be between 5 and 60 characters."),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be between 8 and 16 characters.")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/)
    .withMessage(
      "Password must contain at least one uppercase letter and one special character."
    ),
  body("address")
    .trim()
    .isLength({ max: 400 })
    .withMessage("Address cannot be more than 400 characters."),
];

router.post("/signup", signupValidationRules, signup);

const loginValidationRules = [
  body("email").isEmail().withMessage("Please provide a valid email address."),
  body("password").notEmpty().withMessage("Password is required."),
];

router.post("/login", loginValidationRules, login);

export default router;
