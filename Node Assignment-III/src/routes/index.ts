import express from "express";

import todoRoutes from "./todo.routes";
import userRoutes from "./users.routes";
import authRoutes from "./auth.user.routes";

const router = express.Router();

router.use("/todo", todoRoutes);

router.use("/user", userRoutes);

router.use("/auth", authRoutes);

export default router;
