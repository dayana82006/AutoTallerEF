export interface OrderDetail {
  id: number;
  spareQuantity: number;
  idServiceOrder: number;
  spareCode: string;
  createdAt: Date;
  updatedAt?: Date;
}
