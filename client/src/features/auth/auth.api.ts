import api from '../../services/api';

export interface AuthResponse {
  token: string;
  user: { id: number; name: string; email: string; roles: string[] };
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', { email, password });
  return response.data;
};
