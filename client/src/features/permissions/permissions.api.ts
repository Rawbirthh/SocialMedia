import api from '../../services/api';

export interface Permission {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePermissionData {
  name: string;
  description?: string;
}

export interface UpdatePermissionData {
  name?: string;
  description?: string;
}

export const getPermissions = async (): Promise<Permission[]> => {
  const response = await api.get<Permission[]>('/permissions');
  return response.data;
};

export const getPermission = async (id: number): Promise<Permission> => {
  const response = await api.get<Permission>(`/permissions/${id}`);
  return response.data;
};

export const createPermission = async (data: CreatePermissionData): Promise<Permission> => {
  const response = await api.post<Permission>('/permissions', data);
  return response.data;
};

export const updatePermission = async (id: number, data: UpdatePermissionData): Promise<Permission> => {
  const response = await api.put<Permission>(`/permissions/${id}`, data);
  return response.data;
};

export const deletePermission = async (id: number): Promise<void> => {
  await api.delete(`/permissions/${id}`);
};
