import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Invoice, InvoiceDetail } from '../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class MockInvoiceService {
  private invoices: Invoice[] = [
    {
      id: 1,
      totalSpares: 50000,
      totalServices: 70000,
      finalAmount: 120000,
      clientId: 1,
      createdAt: new Date(),
      invoiceDetails: [
        {
          id: 1,
          invoiceId: 1,
          serviceOrderId: 1,
          createdAt: new Date()
        }
      ]
    }
  ];

  getInvoiceByServiceOrderId(serviceOrderId: number): Observable<Invoice | undefined> {
    const invoice = this.invoices.find(inv =>
      inv.invoiceDetails.some(detail => detail.serviceOrderId === serviceOrderId)
    );
    return of(invoice);
  }
}
