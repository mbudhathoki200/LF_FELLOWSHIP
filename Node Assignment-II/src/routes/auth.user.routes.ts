import express from "express";
import { logIn } from "../controllers/auth.user.controller";

const router = express();

router.post("/login", logIn);

export default router;
