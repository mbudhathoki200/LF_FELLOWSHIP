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
  return users;
}

export function getUserByEmail(email: string) {
  return users.find(({ email: userEmail }) => userEmail === email);
}
