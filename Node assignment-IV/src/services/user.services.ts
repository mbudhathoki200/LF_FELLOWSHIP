import * as UserModel from "../models/user.model";
import { IUser } from "./../interfaces/user.interface";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("UserServices");

export function getUser() {
  logger.info("get user");
  const data = UserModel.getUser();

  if (!data) {
    return {
      error: "No users Found!!",
    };
  }
  return data;
}
export function createUser(user: IUser) {
  logger.info("create user");
  return UserModel.createUser(user);
}

export function getUserByEmail(email: string) {
  logger.info("get user by email");
  const data = UserModel.getUserByEmail(email);
  return data;
}

export function updateUser(id: string, newUserDetails: IUser) {
  logger.info("update user");
  return UserModel.updateUser(id, newUserDetails);
}

export function getUserById(id: string) {
  logger.info("get user by id");
  return UserModel.getUserById(id);
}

export function deleteUser(id: string) {
  logger.info("delete user");
  const data = UserModel.getUserById(id);
  if (!data) {
    return null;
  }
  UserModel.deleteUser(id);
}
