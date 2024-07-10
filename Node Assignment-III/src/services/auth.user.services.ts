import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import config from "../config";
import { IUser } from "../interfaces/user.interface";
import { getUserByEmail } from "./user.services";
import * as UserServices from "../services/user.services";
import { permission } from "process";

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
    permissions: existingUser.permissions,
  };

  const accessToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  const refreshToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });

  return { accessToken, refreshToken };
}

export async function signUp(user: IUser) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const updatedUser = { ...user, password: hashedPassword };

  return UserServices.createUser(updatedUser);
}

export function refreshToken(refresh: string) {
  const decoded: any = verify(refresh, config.jwt.secret!);

  const payload = {
    id: decoded.id,
    name: decoded.name,
    email: decoded.email,
    permissions: decoded.permissions,
  };
  const accessToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });
  return accessToken;
}
