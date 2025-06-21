import { Brand } from './brand';

export interface VehicleModel {
  id: number;
  name: string;
  brandId: number;
  brand?: Brand;
}
