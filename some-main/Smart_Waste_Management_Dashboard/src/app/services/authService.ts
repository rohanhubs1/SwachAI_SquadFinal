import api from './api';

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'driver';
  lat?: number;
  lng?: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'driver' | 'admin';
  };
}

export const signup = async (data: SignupData): Promise<AuthResponse> => {
  const res = await api.post('/auth/signup', data);
  return res.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const res = await api.post('/auth/login', data);
  return res.data;
};

export const getPublicDrivers = async (): Promise<{_id: string, currentLocation: {lat: number, lng: number}}[]> => {
  const res = await api.get('/auth/public-drivers');
  return res.data;
};
