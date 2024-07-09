import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodoById,
  updateTodo,
} from "../controllers/todo.controllers";

const router = express.Router();

router.get("/get", getTodo);

router.get("/get/:id", getTodoById);

router.post("/add", createTodo);

router.put("/update/:id", updateTodo);

router.delete("/delete/:id", deleteTodo);

export default router;
