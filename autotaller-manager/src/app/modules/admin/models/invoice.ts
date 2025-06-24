export interface Invoice {
  id: number;
  totalSpares: number;
  totalServices: number;
  finalAmount: number;
  clientId: number;
  createdAt: Date;
  updatedAt?: Date;
  invoiceDetails: InvoiceDetail[];
}

export interface InvoiceDetail {
  id: number;
  invoiceId: number;
  serviceOrderId: number;
  createdAt: Date;
  updatedAt?: Date;
}
