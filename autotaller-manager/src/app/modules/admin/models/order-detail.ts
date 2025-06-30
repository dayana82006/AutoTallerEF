export interface OrderDetail {
  id: number;
  spareQuantity: number;
  serviceOrderId: number;
  spareCode: string;
  createdAt: Date;
  updatedAt?: Date;
}
