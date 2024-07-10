import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user.controllers";

import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = express();

router.get("/", authenticate, authorize("superAdmin"), getUser);

router.post("/create", authenticate, createUser);

router.put("/:id", updateUser);

router.delete("/delete/:id", deleteUser);

export default router;
