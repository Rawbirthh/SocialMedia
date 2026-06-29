import * as roleRepository from "../repositories/roleRepository";
import type { CreateRoleInput, UpdateRoleInput } from "../validations/roleValidation";
import { ConflictError } from "../errors";

export const getAllRoles = () => {
  return roleRepository.findRoles();
};

export const getRoleById = (id: number) => {
  return roleRepository.findRoleById(id);
};

export const createRole = async (data: CreateRoleInput) => {
  const existing = await roleRepository.findRoleByName(data.name);
  if (existing) {
    throw new ConflictError("name", "Role name already in use");
  }
  return roleRepository.createRole(data);
};

export const updateRole = async (id: number, data: UpdateRoleInput) => {
  if (data.name) {
    const existing = await roleRepository.findRoleByName(data.name);
    if (existing && existing.id !== id) {
      throw new ConflictError("name", "Role name already in use");
    }
  }
  return roleRepository.updateRole(id, data);
};

export const deleteRole = (id: number) => {
  return roleRepository.deleteRole(id);
};
