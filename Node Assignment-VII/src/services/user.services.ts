import bcrypt from "bcrypt";
import * as UserModel from "../models/user.model";
import loggerWithNameSpace from "../utils/logger";
import { IUser } from "./../interfaces/user.interface";
import { NotFoundError } from "../error/NotFoundError";

const logger = loggerWithNameSpace("UserServices");

export async function getUser() {
  logger.info("get user");

  const data = await UserModel.UserModel.getUser();

  if (!data) {
    return {
      error: "No users Found!!",
    };
  }

  return data;
}

export async function createUser(user: IUser) {
  logger.info("create user");
  // const data = UserModel.getUserByEmail(user.email);
  // if (data) {
  //   return;
  // }
  const password = await bcrypt.hash(user.password, 10);
  return UserModel.UserModel.createUser({ ...user, password });
}

export function getUserByEmail(email: string) {
  logger.info("get user by email");
  const data = UserModel.getUserByEmail(email);
  return data;
}

export async function updateUser(id: string, user: IUser) {
  logger.info("update user");
  const data = UserModel.getUserById(id);

  if (!data) {
    return;
  }
  if (user.password) {
    const password = await bcrypt.hash(user.password, 10);
    return UserModel.updateUser(id, { ...user, password });
  }

  return UserModel.updateUser(id, user);
}

export async function getUserById(id: string) {
  logger.info("get user by id");

  const data = await UserModel.UserModel.getUserById(id);
  console.log(data.length);

  if (data.length === 0) {
    throw new NotFoundError(`User with the id: ${id} not found`);
  }

  return data;
}

export function deleteUser(id: string) {
  logger.info("delete user");
  const data = UserModel.getUserById(id);
  if (!data) {
    return null;
  }
  UserModel.deleteUser(id);
}
