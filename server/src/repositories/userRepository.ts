import { prisma } from "../lib/prisma";
import type { CreateUserInput, UpdateUserInput } from "../validations/userValidation";

export const findUsers = () => {
  return prisma.user.findMany({
    include: { roles: { include: { role: true } } },
  });
};

export const findUserById = (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    include: { roles: { include: { role: true } } },
  });
};

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const findUserByEmailWithRoles = (email: string) => {
  return prisma.user.findUnique({
    where: { email },
    include: { roles: { include: { role: true } } },
  });
};

export const createUser = (data: CreateUserInput) => {
  const { roleIds, ...userData } = data;
  const createData: Parameters<typeof prisma.user.create>[0]['data'] = {
    ...userData,
  };
  if (roleIds?.length) {
    createData.roles = { create: roleIds.map((roleId) => ({ roleId })) };
  }
  return prisma.user.create({
    data: createData,
    include: { roles: { include: { role: true } } },
  });
};

export const updateUser = (id: number, data: UpdateUserInput) => {
  const { roleIds, ...userData } = data;
  const filtered: Record<string, string> = {};
  if (userData.name !== undefined) filtered.name = userData.name;
  if (userData.email !== undefined) filtered.email = userData.email;

  if (roleIds !== undefined) {
    const updateData: Parameters<typeof prisma.user.update>[0]['data'] = {
      ...filtered,
    };
    if (roleIds.length) {
      updateData.roles = { create: roleIds.map((roleId) => ({ roleId })) };
    }
    return prisma.$transaction([
      prisma.userRole.deleteMany({ where: { userId: id } }),
      prisma.user.update({
        where: { id },
        data: updateData,
        include: { roles: { include: { role: true } } },
      }),
    ]).then(([, user]) => user);
  }

  return prisma.user.update({
    where: { id },
    data: filtered,
    include: { roles: { include: { role: true } } },
  });
};

export const deleteUser = (id: number) => {
  return prisma.user.delete({ where: { id } });
};
