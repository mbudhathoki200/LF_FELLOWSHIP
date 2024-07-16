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
      .select(
        "users.id",
        "users.name",
        "users.email",
        "users.password",
        "users.createdAt",
        "permissions.permissions"
      )
      .table("users")
      .leftJoin("permissions", "users.id", "permissions.id");

    return query;
  }

  static getUserById(userId: string) {
    const query = this.queryBuilder()
      .select(
        "users.id",
        "users.name",
        "users.email",
        "users.password",
        "users.createdAt",
        "permissions.permissions"
      )
      .table("users")
      .where("users.id", userId)
      .leftJoin("permissions", "users.id", "permissions.id");

    return query;
  }

  static async getUserByEmail(email: string) {
    logger.info("get user by email");
    const query = await this.queryBuilder()
      .select(
        "users.id",
        "users.name",
        "users.email",
        "users.password",
        "users.createdAt",
        "permissions.permissions"
      )
      .table("users")
      .where("users.email", email)
      .leftJoin("permissions", "users.id", "permissions.id")
      .first();

    return query;
  }

  static async updateUser(id: string, user: IUser) {
    const userToUpdate = {
      name: user.name,
      email: user.email,
      password: user.password,
      updatedAt: new Date(),
    };

    const query = await this.queryBuilder()
      .update(userToUpdate)
      .table("users")
      .where({ id });

    await this.queryBuilder()
      .update({ permissions: user.permissions })
      .table("permissions")
      .where({ user_id: id });

    return userToUpdate;
  }

  static async deleteUser(userId: string) {
    await this.queryBuilder()
      .table("permissions")
      .where({ user_id: userId })
      .del();
    await this.queryBuilder().table("users").where({ id: userId }).del();
  }
}
export let users: IUser[] = [
  {
    name: "test",
    email: "test@gmail.com",
    password: "$2b$10$v65.aoddOD0ewBYoP9aukOqyhDFriKisBVkEmnXMHguOIaUE2yUha",
    id: "1",
    permissions: "",
  },
  {
    name: "Manish",
    email: "manish@gmail.com",
    password: "$2b$10$.RKwtAn9DSJyWx5FApO2J.gOyAuNnGNAZpJuMphmcwpfl6s.qDtGK",
    id: "2",
    permissions: "superAdmin",
  },
];
