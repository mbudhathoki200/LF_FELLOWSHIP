import { IUser } from "../interfaces/user.interface";
import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./base.model";

const logger = loggerWithNameSpace("UserModel");

export class UserModel extends BaseModel {
  static async createUser(
    user: Pick<IUser, "name" | "email" | "password" | "permissions">
  ) {
    const userToCreate = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    const query = await this.queryBuilder().insert(userToCreate).table("users");

    if (user.permissions) {
      const emailQuery = this.queryBuilder()
        .select("id")
        .table("users")
        .where({ email: userToCreate.email })
        .first();

      const id = await emailQuery;

      await this.queryBuilder()
        .insert({
          user_id: id.id,
          permissions: user.permissions,
        })
        .table("permissions");
    }
    return user;
  }

  static getUser() {
    const query = this.queryBuilder()
      .select("id", "name", "email", "password", "createdAt")
      .table("users");
    return query;
  }

  static getUserById(userId: string) {
    const query = this.queryBuilder()
      .select("id", "name", "email", "password", "createdAt")
      .table("users")
      .where("id", userId);

    return query;
  }
  static getUserByEmail(email: string) {
    logger.info("get user by email");
    return users.find(({ email: userEmail }) => userEmail === email);
  }
}
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
  user: Pick<IUser, "name" | "email" | "password" | "permissions">
) {
  logger.info("create user");
  const newUser = { ...user, id: `${users.length + 1}` };

  users.push(newUser);

  return newUser;
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

export function updateUser(id: string, user: IUser) {
  logger.info("uppate user");
  let updatedValue;

  users = users.map((userElement) =>
    userElement.id !== id
      ? userElement
      : (updatedValue = {
          ...userElement,
          ...user,
        })
  );
  return updatedValue;
}

export function deleteUser(id: string) {
  logger.info("delete user");
  users = users.filter((user) => user.id !== id);
}
