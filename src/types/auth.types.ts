export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_no?: string;
  address?: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_no?: string;
  address?: string;
}

export interface AuthResponse {
  user: User;
  message?: string;
}
