import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodoById,
  updateTodo,
} from "../controllers/todo.controllers";
import { authenticate } from "../middlewares/auth.middleware";
import {
  validateReqBody,
  validateReqQuery,
} from "../middlewares/validator.middleware";
import { todoBodySchema } from "../schema/todo.schema";
import { getQuerySchema } from "../schema/query.schema";
import { getUserQuerySchema } from "../schema/user.schema";

const router = express.Router();

router.get("/", validateReqQuery(getUserQuerySchema), authenticate, getTodo);

router.get(
  "/get/:id",
  validateReqQuery(getQuerySchema),
  authenticate,
  getTodoById
);

router.post("/add", validateReqBody(todoBodySchema), authenticate, createTodo);

router.put(
  "/update/:id",
  validateReqBody(todoBodySchema),
  authenticate,
  updateTodo
);

router.delete(
  "/delete/:id",
  validateReqQuery(getQuerySchema),
  authenticate,
  deleteTodo
);

export default router;
