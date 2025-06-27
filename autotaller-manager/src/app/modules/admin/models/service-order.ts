import { ServiceType } from "./service-type";
import { User } from "./user";
import { UserMember } from "./user-member";
import { Vehicle } from "./vehicle";
export interface ServiceOrder {
  id: number;
  description: string;
  clientApproved: boolean;
  serialNumber: string; 
  serviceStatusId: number;
  serviceTypeId: number; 
  userId: number; 
  unitPrice: number;
  status: number; 
  createdAt?: Date;
  updatedAt?: Date;
}
