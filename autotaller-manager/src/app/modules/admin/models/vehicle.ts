import { VehicleModel } from './vehicle-model';
import { Client } from './client';
import { FuelType } from './fuel-type';

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
}
