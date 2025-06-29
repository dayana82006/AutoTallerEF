export interface AuthResponse {
  estaAutenticado: string;
  token: string;
  userId: number;
  userName: string;
  rols: string[];
}
