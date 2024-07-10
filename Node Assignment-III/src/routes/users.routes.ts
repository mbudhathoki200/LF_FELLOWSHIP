import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user.controllers";

import { authenticate, authorize } from "../middlewares/auth.middleware";
import { PERMISSIONS } from "../constants/permission";

const router = express();

router.get("/", authenticate, authorize(PERMISSIONS.SUPER_ADMIN), getUser);

router.post(
  "/create",
  authenticate,
  authorize(PERMISSIONS.SUPER_ADMIN),
  createUser
);

router.put(
  "/:id",
  authenticate,
  authorize(PERMISSIONS.SUPER_ADMIN),
  updateUser
);

router.delete(
  "/delete/:id",
  authenticate,
  authorize(PERMISSIONS.SUPER_ADMIN),
  deleteUser
);

export default router;
