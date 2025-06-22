import { VehicleModel } from './vehicle-model';
import { Client } from './client';
import { FuelType } from './fuel-type';
import { VehicleType } from './vehicle-type';

export interface Vehicle {
  id: number;
  serialNumber: string;
  releaseYear: number;
  km: number;
  vehicleModelId: number;
  model?: VehicleModel;
  clientId: number;
  client?: Client;
  fuelTypeId: number;
  fuelType?: FuelType;
  vehicleTypeId: number;
  vehicleType?: VehicleType;
    
  createdAt?: Date;
  updatedAt?: Date;}
