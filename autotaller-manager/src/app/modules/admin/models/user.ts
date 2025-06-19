import { Role } from './role';

export interface User {
  id: number;
  name: string;
  email: string;
  userRoles: {
    roleId: number;
    role: Role;
  }[];
}