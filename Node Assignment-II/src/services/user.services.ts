import bcrypt from "bcrypt";
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

export async function signUp(user: IUser) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const updatedUser = { ...user, password: hashedPassword };

  return UserModel.signUp(updatedUser);
}

export function getUserByEmail(email: string) {
  const data = UserModel.getUserByEmail(email);
  return data;
}
