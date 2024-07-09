import express from "express";
import { getUser, signUp } from "../controllers/user.controllers";
import { auth } from "../middlewares/auth.middleware";

const router = express();

router.post("/signup", signUp);
router.get("/", auth, getUser);

export default router;
