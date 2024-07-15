import bcrypt from "bcrypt";
import {
  createUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  updateUser,
} from "../../services/user.services";

import expect from "expect";
import sinon from "sinon";
import { NotFoundError } from "../../error/NotFoundError";
import { IUser } from "../../interfaces/user.interface";
import * as UserModel from "../../models/user.model";

describe("User Service Test Suite", () => {
  describe("getUserById", () => {
    let userModelGetUserByIdStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUserByIdStub = sinon.stub(UserModel, "getUserById");
    });

    afterEach(() => {
      userModelGetUserByIdStub.restore();
    });

    it("should throw error when user is not found", () => {
      userModelGetUserByIdStub.returns(undefined);

      expect(() => getUserById("100")).toThrow(
        new NotFoundError("User with the id: 100 not found")
      );
    });

    it("show return user if user is found", () => {
      const user = {
        id: "1",
        name: "test",
        email: "test@t.com",
        password: "test1234",
        permissions: [],
      };

      userModelGetUserByIdStub.returns(user);

      const response = getUserById("1");

      expect(response).toStrictEqual(user);
    });
  });

  describe("createUser", () => {
    let bcryptHashStub: sinon.SinonStub;
    let userModelGetUserByEmailStub: sinon.SinonStub;
    let userModelCreateUserStub: sinon.SinonStub;

    beforeEach(() => {
      bcryptHashStub = sinon.stub(bcrypt, "hash");
      userModelGetUserByEmailStub = sinon.stub(UserModel, "getUserByEmail");
      userModelCreateUserStub = sinon.stub(UserModel, "createUser");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should create new user when email is not already used", async () => {
      const user = {
        name: "test",
        email: "test@t.com",
        password: "test1234",
        permissions: [],
      };

      bcryptHashStub.resolves("hashedPassword");
      userModelGetUserByEmailStub.returns(undefined);
      userModelCreateUserStub.returns({
        ...user,
        id: "1",
        password: "hashedPassword",
      });

      const response = await createUser(user as IUser);

      expect(response).toEqual({
        ...user,
        id: "1",
        password: "hashedPassword",
      });

      expect(userModelGetUserByEmailStub.calledOnceWith(user.email)).toBe(true);
      expect(bcryptHashStub.calledOnceWith(user.password, 10)).toBe(true);
      expect(userModelCreateUserStub.calledOnce).toBe(true);

      const createUserArg = userModelCreateUserStub.firstCall.args[0];
      expect(createUserArg).toEqual(
        expect.objectContaining({
          ...user,
          password: "hashedPassword",
        })
      );
    });

    it("should not create a user when email already exists", async () => {
      const user = {
        name: "test",
        email: "test@t.com",
        password: "test1234",
        id: "1",
        permissions: [],
      };

      userModelGetUserByEmailStub.returns({ ...user, id: "2" });

      const response = await createUser(user);

      expect(userModelGetUserByEmailStub.calledOnceWith(user.email)).toBe(true);
      expect(bcryptHashStub.called).toBe(false);
      expect(userModelCreateUserStub.called).toBe(false);
      expect(response).toBeUndefined();
    });
  });

  describe("deleteUser", () => {
    let UserModelGetUserByIdStub: sinon.SinonStub;
    let UserModelDeleteUserStub: sinon.SinonStub;

    beforeEach(() => {
      UserModelGetUserByIdStub = sinon.stub(UserModel, "getUserById");
      UserModelDeleteUserStub = sinon.stub(UserModel, "deleteUser");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should delete an existing user", () => {
      const userId = "1";
      const user = {
        id: userId,
        name: "test",
        email: "test@t.com",
        password: "test1234",
        permissions: [],
      };

      UserModelGetUserByIdStub.returns(user);
      const response = deleteUser(userId);

      expect(UserModelGetUserByIdStub.calledOnceWith(userId)).toBe(true);
      expect(UserModelDeleteUserStub.calledOnceWith(userId)).toBe(true);
      expect(response).toBe(undefined);
    });

    it("should return null when trying to delete a non-existent user", () => {
      const userId = "100";

      UserModelGetUserByIdStub.returns(undefined);

      const response = deleteUser(userId);

      expect(UserModelGetUserByIdStub.calledOnceWith(userId)).toBe(true);
      expect(UserModelDeleteUserStub.called).toBe(false);
      expect(response).toBe(null);
    });
  });

  describe("getUserByEmail", () => {
    let userModelGetUserByEmailStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUserByEmailStub = sinon.stub(UserModel, "getUserByEmail");
    });

    afterEach(() => {
      userModelGetUserByEmailStub.restore();
    });

    it("should return undefined when user is not found", () => {
      userModelGetUserByEmailStub.returns(undefined);

      const response = getUserByEmail("uniqueEmail@test.com");

      expect(response).toBe(undefined);
    });

    it("show return user if user is found", () => {
      const user = {
        id: "1",
        name: "test",
        email: "test@t.com",
        password: "test1234",
        permissions: [],
      };

      userModelGetUserByEmailStub.returns(user);

      const response = getUserByEmail("test@t.com");

      expect(response).toStrictEqual(user);
    });
  });

  describe("updateUser", () => {
    let UserModelGetUserByIdStub: sinon.SinonStub;
    let UserModelUpdateUserStub: sinon.SinonStub;
    let bcryptHashStub: sinon.SinonStub;

    beforeEach(() => {
      UserModelGetUserByIdStub = sinon.stub(UserModel, "getUserById");
      UserModelUpdateUserStub = sinon.stub(UserModel, "updateUser");
      bcryptHashStub = sinon.stub(bcrypt, "hash");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should update user (no password change)", async () => {
      const userId = "123";
      const user = {
        id: userId,
        name: "test",
        email: "test@t.com",
        password: "test1234",
        permissions: [],
      };
      const newUser = {
        name: "zest",
        email: "zest@t.com",
      };

      UserModelGetUserByIdStub.returns(user);
      UserModelUpdateUserStub.resolves({ ...user, ...newUser });

      const result = await updateUser(userId, newUser as IUser);

      expect(UserModelGetUserByIdStub.calledOnceWith(userId)).toBe(true);
      expect(UserModelUpdateUserStub.calledOnceWith(userId, newUser)).toBe(
        true
      );
      expect(bcryptHashStub.called).toBe(false);
      expect(result).toStrictEqual({ ...user, ...newUser });
    });

    it("should update user with password change", async () => {
      const hashedPassword = "hashedPassword";
      const userId = "123";
      const user = {
        id: userId,
        name: "test",
        email: "test@t.com",
        password: "test1234",
        permissions: [],
      };
      const newUser = {
        password: "plainPassword",
      };

      UserModelGetUserByIdStub.returns(user);
      bcryptHashStub.resolves(hashedPassword);
      UserModelUpdateUserStub.returns({
        ...user,
        ...newUser,
        hashedPassword,
      });

      const result = await updateUser(userId, newUser as IUser);

      expect(UserModelGetUserByIdStub.calledOnceWith(userId)).toBe(true);
      expect(
        UserModelUpdateUserStub.calledOnceWith(userId, {
          ...newUser,
          password: hashedPassword,
        })
      ).toBe(true);
      expect(bcryptHashStub.calledOnceWith(newUser.password, 10)).toBe(true);
      expect(result).toStrictEqual({
        ...user,
        ...newUser,
        hashedPassword,
      });
    });

    it("should return undefined when user is not found", async () => {
      const userId = "100";
      const newUser = {
        name: "test",
        email: "test@t.com",
      };

      UserModelGetUserByIdStub.returns(undefined);

      const result = await updateUser(userId, newUser as IUser);

      expect(UserModelGetUserByIdStub.calledOnceWith(userId)).toBe(true);
      expect(UserModelUpdateUserStub.called).toBe(false);
      expect(bcryptHashStub.called).toBe(false);
      expect(result).toBe(undefined);
    });
  });
});
