export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface User {
  userId: number;
  name: string;
  email: string;
  role: 'PASSENGER' | 'ADMIN';
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: User;
}