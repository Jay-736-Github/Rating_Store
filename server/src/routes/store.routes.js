import { Router } from "express";
import { body } from "express-validator";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/roles.js";
import {
  createStore,
  getAllStores,
  getOwnerDashboard,
} from "../controllers/store.controller.js";
import { submitRating } from "../controllers/rating.controller.js"; 

const router = Router();

const createStoreValidationRules = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 60 })
    .withMessage("Name is required and must be less than 60 characters."),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid store email.")
    .normalizeEmail(),
  body("address")
    .trim()
    .isLength({ min: 1, max: 400 })
    .withMessage("Address is required and must be less than 400 characters."),
  body("ownerId").isInt({ gt: 0 }).withMessage("A valid ownerId is required."),
];

router.post(
  "/",
  auth,
  checkRole(["ADMIN"]),
  createStoreValidationRules,
  createStore
);

router.get("/", auth, getAllStores);

const ratingValidationRules = [
  body("value")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5."),
];

router.post(
  "/:storeId/rate",
  auth,
  checkRole(["USER"]), 
  ratingValidationRules,
  submitRating
);

router.get(
  "/dashboard",
  auth,
  checkRole(["OWNER"]), 
  getOwnerDashboard
);

export default router;
