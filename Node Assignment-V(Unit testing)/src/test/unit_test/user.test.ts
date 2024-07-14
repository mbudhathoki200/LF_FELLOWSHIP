import bcrypt from "bcrypt";
import { createUser, getUserById } from "../../services/user.services";

import expect from "expect";
import sinon from "sinon";
import { BadRequest } from "../../../src/error/BadRequest";
import * as UserModel from "../../models/user.model";
import { NotFoundError } from "../../error/NotFoundError";

describe("User Service Test Suite", () => {
  //   describe("getUserById", () => {
  //     let userModelGetUserByIdStub: sinon.SinonStub;

  //     beforeEach(() => {
  //       userModelGetUserByIdStub = sinon.stub(UserModel, "getUserById");
  //     });

  //     afterEach(() => {
  //       userModelGetUserByIdStub.restore();
  //     });

  //     it("should throw error when user is not found", () => {
  //       userModelGetUserByIdStub.returns(undefined);

  //       expect(() => getUserById("100")).toThrow(
  //         new NotFoundError("User with the id: 100 not found")
  //       );
  //     });

  //     it("show return user if user is found", () => {
  //       const user = {
  //         id: "1",
  //         name: "test",
  //         email: "test@t.com",
  //         password: "test1234",
  //         permissions: [],
  //       };

  //       userModelGetUserByIdStub.returns(user);

  //       const response = getUserById("1");

  //       expect(response).toStrictEqual(user);
  //     });
  //   });

  describe("createUser", () => {
    let bcryptHashStub: sinon.SinonStub;

    let userModelCreateUserStub: sinon.SinonStub;

    beforeEach(() => {
      bcryptHashStub = sinon.stub(bcrypt, "hash");
      userModelCreateUserStub = sinon.stub(UserModel, "createUser");
    });

    afterEach(() => {
      bcryptHashStub.restore();
      userModelCreateUserStub.restore();
    });

    it("Should create new user", async () => {
      bcryptHashStub.resolves("hashedPassword");
      const user = {
        id: "1",
        name: "test",
        email: "test@t.com",
        password: "test1234",
        permissions: [],
      };
      await createUser(user);

      expect(bcryptHashStub.callCount).toBe(1);
      expect(bcryptHashStub.getCall(0).args).toStrictEqual([user.password, 10]);

      expect(userModelCreateUserStub.callCount).toBe(1);

      expect(userModelCreateUserStub.getCall(0).args).toStrictEqual([
        {
          ...user,
          password: "hashedPassword",
        },
      ]);
    });
  });
});
