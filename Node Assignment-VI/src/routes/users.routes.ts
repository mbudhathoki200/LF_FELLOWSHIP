import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUserById,
  updateUser,
} from "../controllers/user.controllers";

import { authenticate, authorize } from "../middlewares/auth.middleware";
import { PERMISSIONS } from "../constants/permission";
import { createUserBodySchema } from "../schema/user.schema";
import {
  validateReqBody,
  validateReqQuery,
} from "../middlewares/validator.middleware";
import { getQuerySchema } from "../schema/query.schema";

const router = express();

router.get("/", authenticate, authorize(PERMISSIONS.SUPER_ADMIN), getUser);

router.get(
  "/:id",
  authenticate,
  authorize(PERMISSIONS.SUPER_ADMIN),
  getUserById
);

router.post(
  "/create",
  validateReqBody(createUserBodySchema),
  authenticate,
  authorize(PERMISSIONS.SUPER_ADMIN),
  createUser
);

router.put(
  "/:id",
  validateReqBody(createUserBodySchema),
  authenticate,
  authorize(PERMISSIONS.SUPER_ADMIN),
  updateUser
);

router.delete(
  "/delete/:id",
  validateReqQuery(getQuerySchema),
  authenticate,
  authorize(PERMISSIONS.SUPER_ADMIN),
  deleteUser
);

export default router;
