import { VehicleAnormalityDetail } from "./vehicle-anormality-detail";

export interface VehicleAnormality {
  id: number;
  name: string;
  entryDate: string; 
    
  createdAt?: Date;
  updatedAt?: Date;
  vehicleAnormalityDetails?: VehicleAnormalityDetail[];
}
