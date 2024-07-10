import { error } from "console";
import { IUser } from "../interfaces/user.interface";

let users: IUser[] = [
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
    permissions: ["superUser"],
  },
];

export function createUser(
  newUser: Pick<IUser, "name" | "email" | "password" | "permissions">
) {
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
  if (users.length == 0) {
    return {
      error: "No users Registered!!",
    };
  }
  return users;
}

export function getUserById(id: string) {
  return users.find(({ id: userId }) => userId == id);
}
export function getUserByEmail(email: string) {
  return users.find(({ email: userEmail }) => userEmail === email);
}

export function updateUser(id: string, newUserDetails: IUser) {
  users = users.map((user) => {
    return user.id === id ? { ...newUserDetails, id: user.id } : user;
  });
  return users;
}

export function deleteUser(id: string) {
  users = users.filter((user) => user.id !== id);
}
