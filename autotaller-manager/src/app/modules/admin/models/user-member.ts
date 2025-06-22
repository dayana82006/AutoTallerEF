export interface UserMember {
  id: number;
  name: string;
  lastname: string;
  email: string;
  role: string;
  specialties: string[];
    
  createdAt?: Date;
  updatedAt?: Date;}
