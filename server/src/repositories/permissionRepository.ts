import { prisma } from "../lib/prisma";
import type { CreatePermissionInput, UpdatePermissionInput } from "../validations/permissionValidation";

export const findPermissions = () => {
  return prisma.permission.findMany();
};

export const findPermissionById = (id: number) => {
  return prisma.permission.findUnique({ where: { id } });
};

export const findPermissionByName = (name: string) => {
  return prisma.permission.findUnique({ where: { name } });
};

export const createPermission = (data: CreatePermissionInput) => {
  return prisma.permission.create({
    data: {
      name: data.name,
      ...(data.description !== undefined && { description: data.description }),
    },
  });
};

export const updatePermission = (id: number, data: UpdatePermissionInput) => {
  const updateData: { name?: string; description?: string | null } = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.description !== undefined) updateData.description = data.description;
  return prisma.permission.update({ where: { id }, data: updateData });
};

export const deletePermission = (id: number) => {
  return prisma.permission.delete({ where: { id } });
};
