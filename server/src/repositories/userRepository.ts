import { prisma } from "../lib/prisma";
import type { CreateUserInput, UpdateUserInput } from "../validations/userValidation";

export const findUsers = () => {
  return prisma.user.findMany();
};

export const findUserById = (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const createUser = (data: CreateUserInput) => {
  return prisma.user.create({ data });
};

export const updateUser = (id: number, data: UpdateUserInput) => {
  const filtered: Record<string, string> = {};
  if (data.name !== undefined) filtered.name = data.name;
  if (data.email !== undefined) filtered.email = data.email;
  return prisma.user.update({ where: { id }, data: filtered });
};

export const deleteUser = (id: number) => {
  return prisma.user.delete({ where: { id } });
};
