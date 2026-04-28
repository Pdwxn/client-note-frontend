export interface User {
  id: number;
  username: string;
}

export interface Token {
  access: string;
  refresh: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
}

export interface AuthResponse extends Token {
  user: User;
}