import { IUser } from "../interfaces/user.interface";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("UserModel");

export let users: IUser[] = [
  {
    name: "test",
    email: "test@gmail.com",
    password: "$2b$10$v65.aoddOD0ewBYoP9aukOqyhDFriKisBVkEmnXMHguOIaUE2yUha",
    id: "1",
    permissions: [""],
  },
  {
    name: "Manish",
    email: "manish@gmail.com",
    password: "$2b$10$.RKwtAn9DSJyWx5FApO2J.gOyAuNnGNAZpJuMphmcwpfl6s.qDtGK",
    id: "2",
    permissions: ["superAdmin"],
  },
];

export function createUser(
  newUser: Pick<IUser, "name" | "email" | "password" | "permissions">
) {
  logger.info("create user");
  const user = getUserByEmail(newUser.email);

  if (user) {
    return {
      error: "User with this email already exists",
    };
  }

  users.push({
    ...newUser,
    id: `${users.length + 1}`,
  });

  return users;
}

export function getUser() {
  logger.info("get user");
  return users;
}

export function getUserById(id: string) {
  logger.info("get user by id");
  return users.find(({ id: userId }) => userId == id);
}

export function getUserByEmail(email: string) {
  logger.info("get user by email");
  return users.find(({ email: userEmail }) => userEmail === email);
}

export function updateUser(id: string, newUserDetails: IUser) {
  logger.info("uppate user");
  users = users.map((user) => {
    return user.id === id ? { ...newUserDetails, id: user.id } : user;
  });
  return users;
}

export function deleteUser(id: string) {
  logger.info("delete user");
  users = users.filter((user) => user.id !== id);
}
