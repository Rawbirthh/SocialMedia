import api from '../../services/api';

export interface Permission {
  id: number;
  name: string;
  description: string | null;
}

export interface RolePermission {
  id: number;
  roleId: number;
  permissionId: number;
  permission: Permission;
}

export interface Role {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  permissions: RolePermission[];
}

export interface CreateRoleData {
  name: string;
  description?: string;
  permissionIds?: number[];
}

export interface UpdateRoleData {
  name?: string;
  description?: string;
  permissionIds?: number[];
}

export const getRoles = async (): Promise<Role[]> => {
  const response = await api.get<Role[]>('/roles');
  return response.data;
};

export const getRole = async (id: number): Promise<Role> => {
  const response = await api.get<Role>(`/roles/${id}`);
  return response.data;
};

export const createRole = async (data: CreateRoleData): Promise<Role> => {
  const response = await api.post<Role>('/roles', data);
  return response.data;
};

export const updateRole = async (id: number, data: UpdateRoleData): Promise<Role> => {
  const response = await api.put<Role>(`/roles/${id}`, data);
  return response.data;
};

export const deleteRole = async (id: number): Promise<void> => {
  await api.delete(`/roles/${id}`);
};
