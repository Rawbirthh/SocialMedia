import api from '../../services/api';

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/users');
  return response.data;
};

export const createUser = async (data: { name: string; email: string; password: string }): Promise<User> => {
  const response = await api.post<User>('/users', data);
  return response.data;
};

export const updateUser = async (id: number, data: { name: string; email: string }): Promise<User> => {
  const response = await api.put<User>(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
