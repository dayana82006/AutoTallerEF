import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin, of, switchMap } from 'rxjs';
import { Invoice } from '../models/invoice';
import { ServiceOrder } from '../models/service-order';
import { Vehicle } from '../models/vehicle';
import { Client } from '../models/client';
import { MockInvoiceService } from '../services/mock-invoice';
import { MockServiceOrderService } from '../services/mock-service-order';
import { MockVehicleService } from '../services/mock-vehicle';
import { MockClientService } from '../services/mock-client';
import { AuthService } from '../../auth/services/auth';

@Component({
  selector: 'app-invoice-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-detail.component.html',
})
export class InvoicePageComponent implements OnInit {
  invoice?: Invoice;
  serviceOrder?: ServiceOrder;
  vehicle?: Vehicle;
  client?: Client;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: MockInvoiceService,
    private serviceOrderService: MockServiceOrderService,
    private vehicleService: MockVehicleService,
    private clientService: MockClientService,
    public authService: AuthService
  ) {}
    get userRole(): string {
      return this.authService.currentUser?.role ?? '';
    }

  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));

    this.invoiceService.getInvoiceByServiceOrderId(orderId).pipe(
      switchMap(invoice => {
        if (!invoice || invoice.invoiceDetails.length === 0) {
          return of(null);
        }

        this.invoice = invoice;
        const serviceOrderId = invoice.invoiceDetails[0].serviceOrderId;

        return this.serviceOrderService.getServiceOrderById(serviceOrderId).pipe(
          switchMap(order => {
            if (!order) return of(null);
            this.serviceOrder = order;

            const vehicleId = order.serialNumber;

            return forkJoin({
              vehicle: this.vehicleService.getVehicleBySerialNumber(vehicleId),
              clients: this.clientService.getAll()
            });
          })
        );
      })
    ).subscribe(result => {
  if (result?.vehicle && result?.clients) {
    this.vehicle = result.vehicle;
    this.client = result.clients.find(
      (c: Client) => c.id === result.vehicle!.clientId
    );
  }
});
  }
}
