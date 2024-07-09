import { error } from "console";
import { IUser } from "../interfaces/user.interface";

const users: IUser[] = [];

export function signUp(newUser: IUser) {
  users.map((user) => {
    if (user.email == newUser.email) {
      return {
        error: "User Already Exists",
      };
    }
  });

  users.push({
    ...newUser,
    id: `${users.length + 1}`,
  });
  return users;
}

export function getUser() {
  if (users.length == 0) {
    return {
      error: "No users Registered!!",
    };
  }
  return users;
}

export function getUserByEmail(email: string) {
  return users.find(({ email: userEmail }) => userEmail === email);
}
