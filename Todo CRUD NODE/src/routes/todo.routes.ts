import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodoById,
  updateTodo,
} from "../controllers/todo.controllers";

const router = express.Router();

router.get("/getTodo", getTodo);

router.get("/getTodo/:id", getTodoById);

router.post("/createTodo", createTodo);

router.put("/update/:id", updateTodo);

router.delete("/delete/:id", deleteTodo);

export default router;
