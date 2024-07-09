import express from "express";
import { logIn, refreshToken } from "../controllers/auth.user.controller";

const router = express();

router.post("/login", logIn);

router.post("/refresh", refreshToken);

export default router;
