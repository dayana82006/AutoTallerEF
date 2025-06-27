export interface UserMember {
  id: number;
  name: string;
  username:string;
  lastname: string;
  password?: string;
  email: string;
  role: string;
  specialties: string[];
    
  createdAt?: Date;
  updatedAt?: Date;}
