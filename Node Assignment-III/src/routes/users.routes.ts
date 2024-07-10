import express from "express";
import {
  createUser,
  getUser,
  updateUser,
} from "../controllers/user.controllers";
import { authenticate } from "../middlewares/auth.middleware";

const router = express();

router.get("/", authenticate, getUser);

router.post("/create", authenticate, createUser);

router.put("/:id", updateUser);

export default router;
