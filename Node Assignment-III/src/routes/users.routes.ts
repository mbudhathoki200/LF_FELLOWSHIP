import express from "express";
import { getUser } from "../controllers/user.controllers";
import { authenticate } from "../middlewares/auth.middleware";

const router = express();

router.get("/", authenticate, getUser);

// router.post("/create", authenticate, createUser);
// router.get("/create", authenticate, getUser);
export default router;
