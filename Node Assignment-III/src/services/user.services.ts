import * as UserModel from "../models/user.model";
import { IUser } from "./../interfaces/user.interface";

export function getUser() {
  const data = UserModel.getUser();

  if (!data) {
    return {
      error: "No users Found!!",
    };
  }
  return data;
}
export function createUser(user: IUser) {
  return UserModel.createUser(user);
}

export function getUserByEmail(email: string) {
  const data = UserModel.getUserByEmail(email);
  return data;
}

export function updateTodo(id: string, newUserDetails: IUser) {
  return UserModel.updateUser(id, newUserDetails);
}
