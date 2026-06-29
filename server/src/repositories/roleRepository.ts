import { prisma } from "../lib/prisma";
import type { CreateRoleInput, UpdateRoleInput } from "../validations/roleValidation";

export const findRoles = () => {
  return prisma.role.findMany({
    include: {
      permissions: {
        include: { permission: true },
      },
    },
  });
};

export const findRoleById = (id: number) => {
  return prisma.role.findUnique({
    where: { id },
    include: {
      permissions: {
        include: { permission: true },
      },
    },
  });
};

export const findRoleByName = (name: string) => {
  return prisma.role.findUnique({ where: { name } });
};

export const createRole = (data: CreateRoleInput) => {
  const { permissionIds, ...roleData } = data;
  const createData: {
    name: string;
    description?: string;
    permissions?: { create: { permission: { connect: { id: number } } }[] };
  } = {
    name: roleData.name,
  };

  if (roleData.description !== undefined) {
    createData.description = roleData.description;
  }

  if (permissionIds && permissionIds.length > 0) {
    createData.permissions = {
      create: permissionIds.map((permissionId) => ({
        permission: { connect: { id: permissionId } },
      })),
    };
  }

  return prisma.role.create({
    data: createData,
    include: {
      permissions: {
        include: { permission: true },
      },
    },
  });
};

export const updateRole = (id: number, data: UpdateRoleInput) => {
  const { permissionIds, ...roleData } = data;
  const updateData: { name?: string; description?: string | null } = {};
  
  if (roleData.name !== undefined) updateData.name = roleData.name;
  if (roleData.description !== undefined) updateData.description = roleData.description;

  return prisma.role.update({
    where: { id },
    data: {
      ...updateData,
      ...(permissionIds !== undefined && {
        permissions: {
          deleteMany: {},
          create: permissionIds.map((permissionId) => ({
            permission: { connect: { id: permissionId } },
          })),
        },
      }),
    },
    include: {
      permissions: {
        include: { permission: true },
      },
    },
  });
};

export const deleteRole = (id: number) => {
  return prisma.role.delete({ where: { id } });
};
