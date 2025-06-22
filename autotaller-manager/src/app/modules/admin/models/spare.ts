export interface Spare {
  id: number;                
  code: string;
  description?: string;
  stockQuantity: number;
  unitPrice: number;
    
  createdAt?: Date;
  updatedAt?: Date;}
