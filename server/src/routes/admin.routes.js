import { Router } from "express";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/roles.js";
import { getAnalytics, getUsers } from "../controllers/admin.controller.js"; 

const router = Router();

router.get(
  "/dashboard/analytics",
  auth,
  checkRole(["ADMIN"]),
  getAnalytics
);

router.get("/users", auth, checkRole(["ADMIN"]), getUsers);

export default router;
