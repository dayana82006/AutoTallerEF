import { OrderDetail } from "./order-detail";
import { ServiceType } from "./service-type";
import { User } from "./user";
import { UserMember } from "./user-member";
import { Vehicle } from "./vehicle";
export interface ServiceOrder {
  id: number;
  description: string;
  approvedByClient: boolean;
  serialNumber: string; 
  serviceTypeId: number; 
  userMemberId: number; 
  unitPrice: number;
  serviceStatusId: number; 
  createdAt?: Date;
  updatedAt?: Date;
  invoiceId: number;
  
  orderDetails?: OrderDetail[];
}
