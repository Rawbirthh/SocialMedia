import * as userRepository from "../repositories/userRepository";
import type { CreateUserInput, UpdateUserInput } from "../validations/userValidation";
import { ConflictError } from "../errors";

export const getAllUsers = () => {
  return userRepository.findUsers();
};

export const getUserById = (id: number) => {
  return userRepository.findUserById(id);
};

export const createUser = async (data: CreateUserInput) => {
  const existing = await userRepository.findUserByEmail(data.email);
  if (existing) {
    throw new ConflictError("email", "Email already in use");
  }
  return userRepository.createUser(data);
};

export const updateUser = (id: number, data: UpdateUserInput) => {
  return userRepository.updateUser(id, data);
};

export const deleteUser = (id: number) => {
  return userRepository.deleteUser(id);
};
