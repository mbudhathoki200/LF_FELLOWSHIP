import bcrypt from "bcrypt";
import { IUser } from "../interfaces/user.interface";
import { getUserByEmail } from "./user.services";
import { error } from "console";
import { sign } from "jsonwebtoken";
import config from "../config";

export function logIn(body: Pick<IUser, "email" | "password">) {
  const existingUser = getUserByEmail(body.email);
  if (!existingUser) {
    return {
      error: "Invalid Username or Password",
    };
  }
  const isValidPassword = bcrypt.compare(existingUser.password, body.password);

  if (!isValidPassword) {
    return {
      error: "Invalid Username or Password",
    };
  }
  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
  };

  const accessToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  const refreshToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });

  return { accessToken, refreshToken };
}
