import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { BadRequest } from "../error/BadRequest";
import * as UserService from "../services/user.services";
import loggerWithNameSpace from "../utils/logger";
import { NotFoundError } from "../error/NotFoundError";

const logger = loggerWithNameSpace("UserController");

export function getUser(req: Request, res: Response, next: NextFunction) {
  logger.info("get user");
  const users = UserService.getUser();
  if (!users) {
    next(new NotFoundError(`No users Found`));
    return;
  }
  res.status(HttpStatusCodes.OK).send(users);
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("create user");
  const { body } = req;
  const data = await UserService.createUser(body);

  if (!data) {
    next(new BadRequest("User with that email already exists"));
    return;
  }

  res.status(HttpStatusCodes.CREATED).json({
    message: "User created Successfully",
    data,
  });
}

export function updateUser(req: Request, res: Response, next: NextFunction) {
  logger.info("update user");
  const { id } = req.params;
  const newUserDetails = req.body;

  const data = UserService.updateUser(id, newUserDetails);

  if (!data) {
    next(new NotFoundError(`User with id: ${id} not found`));
    return;
  }
  res.status(HttpStatusCodes.OK).send({
    message: "Upated Succesfully",
    todos: data,
  });
}

export function deleteUser(req: Request, res: Response, next: NextFunction) {
  logger.info("delete user");
  const { id } = req.params;
  console.log(id);
  const user = UserService.deleteUser(id);
  if (user === null) {
    next(new BadRequest(`User with id: ${id} not found`));
    return;
  }
  res.status(HttpStatusCodes.OK).send(`User with id:${id} deleted`);
}

export function getUserById(req: Request, res: Response, next: NextFunction) {
  logger.info("get user by id");
  const { id } = req.params;

  const user = UserService.getUserById(id);
  res.status(HttpStatusCodes.OK).send(user);
}
