export interface Client {
  id: number;
  name: string;
  lastname: string;
  telephone: string;
  email: string;

  createdAt?: Date;
  updatedAt?: Date;}