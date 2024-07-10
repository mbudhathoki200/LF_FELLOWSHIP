import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user.controllers";
import { authenticate } from "../middlewares/auth.middleware";

const router = express();

router.get("/", authenticate, getUser);

router.post("/create", authenticate, createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
