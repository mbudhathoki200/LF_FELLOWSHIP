import bcrypt from "bcrypt";
import HttpStatusCodes from "http-status-codes";
import request from "supertest";

import express from "express";
import router from "../../routes";
import { users } from "../../models/user.model";
import expect from "expect";
import config from "../../config";
const { test } = config;
describe("User Integration Test Suite", () => {
  const app = express();
  app.use(express.json());
  app.use(router);

  describe("createUser API Test", async () => {
    it("Should create a new user", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          name: "User Integration Test",
          email: "user1@test.com",
          password:
            "$2b$10$MaHbU9Fp4HKtMqF.vNZ94./M.UJjbYd3McHeXa1bzGdg5MbHq3zsm",
          id: "1",
          permissions: ["superAdmin"],
        });
      console.log(users);
    });
  });

  describe("deleteUser", async () => {
    it("should delete the user", async () => {
      const id = "1";
      const response = await request(app)
        .delete(`/user/delete/${id}`)
        .set("Authorization", `Bearer ${test.accessTokenSuperAdmin}`)
        .expect(HttpStatusCodes.OK);

      expect(response.body.message).toBe(`User with id:${id} deleted`);

      // checking if user is deleted
      // const user = users.find((user) => user.id === id);
      // expect(user).toBeUndefined;
    });
  });
});
