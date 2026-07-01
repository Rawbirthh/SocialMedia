import * as userRepository from "../repositories/userRepository";
import type { CreateUserInput, UpdateUserInput } from "../validations/userValidation";
import { ConflictError } from "../errors";
import bcrypt from "bcryptjs";

export const getAllUsers = () => {
  return userRepository.findUsers();
};

export const getUserById = (id: number) => {
  return userRepository.findUserById(id);
};

export const getUserByEmail = (email: string) => {
  return userRepository.findUserByEmail(email);
};

export const getUserByEmailWithRoles = (email: string) => {
  return userRepository.findUserByEmailWithRoles(email);
};

export const createUser = async (data: CreateUserInput) => {
  const existing = await userRepository.findUserByEmail(data.email);
  if (existing) {
    throw new ConflictError("email", "Email already in use");
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return userRepository.createUser({ ...data, password: hashedPassword });
};

export const updateUser = (id: number, data: UpdateUserInput) => {
  return userRepository.updateUser(id, data);
};

export const deleteUser = (id: number) => {
  return userRepository.deleteUser(id);
};
