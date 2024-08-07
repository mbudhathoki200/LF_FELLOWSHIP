import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { BadRequest } from "../error/BadRequest";
import { NotFoundError } from "../error/NotFoundError";
import * as UserService from "../services/user.services";
import loggerWithNameSpace from "../utils/logger";
import { GetUserQuery } from "../interfaces/user.interface";

const logger = loggerWithNameSpace("UserController");

export async function getUser(
  req: Request<any, any, any, GetUserQuery>,
  res: Response,
  next: NextFunction
) {
  logger.info("get user");
  const { query } = req;
  const users = await UserService.getUser(query);
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

  // if (!data) {
  //   next(new BadRequest("User with that email already exists"));
  //   return;
  // }

  res.status(HttpStatusCodes.CREATED).json({
    message: "User created Successfully",
    data,
  });
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("update user");
  const { id } = req.params;
  const newUserDetails = req.body;

  const data = await UserService.updateUser(id, newUserDetails);

  if (!data) {
    next(new NotFoundError(`User with id: ${id} not found`));
    return;
  }
  res.status(HttpStatusCodes.OK).send({
    message: "Upated Succesfully",
    todos: data,
  });
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("delete user");
  const { id } = req.params;
  const user = await UserService.deleteUser(id);

  if (user === null) {
    next(new BadRequest(`User with id: ${id} not found`));
    return;
  }

  res.status(HttpStatusCodes.OK).send(`User with id: ${id} deleted`);
}

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("get user by id");

  const { id } = req.params;

  try {
    const user = await UserService.getUserById(id);
    res.status(HttpStatusCodes.OK).send(user);
  } catch (error) {
    next(error);
    return;
  }
}
