import express from "express";

import {
  logIn,
  refreshToken,
  signUp,
} from "../controllers/auth.user.controller";

const router = express();

router.post("/signup", signUp);

router.post("/login", logIn);

router.post("/refresh", refreshToken);

export default router;
