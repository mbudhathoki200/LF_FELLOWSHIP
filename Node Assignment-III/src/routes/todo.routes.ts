import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodoById,
  updateTodo,
} from "../controllers/todo.controllers";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/get", authenticate, getTodo);

router.get("/get/:id", authenticate, getTodoById);

router.post("/add", authenticate, createTodo);

router.put("/update/:id", authenticate, updateTodo);

router.delete("/delete/:id", authenticate, deleteTodo);

export default router;
