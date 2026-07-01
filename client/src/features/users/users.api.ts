import api from '../../services/api';
import type { Role } from '../roles/roles.api';

export interface UserRole {
  id: number;
  userId: number;
  roleId: number;
  role: Role;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  roles: UserRole[];
  createdAt: string;
  updatedAt: string;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/users');
  return response.data;
};

export const createUser = async (data: { name: string; email: string; password: string; roleIds?: number[] }): Promise<User> => {
  const response = await api.post<User>('/users', data);
  return response.data;
};

export const updateUser = async (id: number, data: { name?: string; email?: string; roleIds?: number[] }): Promise<User> => {
  const response = await api.put<User>(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
