import * as permissionRepository from "../repositories/permissionRepository";
import type { CreatePermissionInput, UpdatePermissionInput } from "../validations/permissionValidation";
import { ConflictError } from "../errors";

export const getAllPermissions = () => {
  return permissionRepository.findPermissions();
};

export const getPermissionById = (id: number) => {
  return permissionRepository.findPermissionById(id);
};

export const createPermission = async (data: CreatePermissionInput) => {
  const existing = await permissionRepository.findPermissionByName(data.name);
  if (existing) {
    throw new ConflictError("name", "Permission name already in use");
  }
  return permissionRepository.createPermission(data);
};

export const updatePermission = async (id: number, data: UpdatePermissionInput) => {
  if (data.name) {
    const existing = await permissionRepository.findPermissionByName(data.name);
    if (existing && existing.id !== id) {
      throw new ConflictError("name", "Permission name already in use");
    }
  }
  return permissionRepository.updatePermission(id, data);
};

export const deletePermission = (id: number) => {
  return permissionRepository.deletePermission(id);
};
