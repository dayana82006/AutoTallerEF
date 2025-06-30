import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin, of, switchMap } from 'rxjs';

import { Invoice } from '../models/invoice';
import { ServiceOrder } from '../models/service-order';
import { Vehicle } from '../models/vehicle';
import { Client } from '../models/client';
import { OrderDetail } from '../models/order-detail';
import { Spare } from '../models/spare';

import { MockInvoiceService } from '../services/mock-invoice';
import { MockServiceOrderService } from '../services/mock-service-order';
import { MockVehicleService } from '../services/mock-vehicle';
import { MockClientService } from '../services/mock-client';
import { MockSpareService } from '../services/mock-spares';
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
    private spareService: MockSpareService,
    public authService: AuthService
  ) {}

  get userRole(): string {
    return this.authService.currentUser?.rols?.[0] ?? '';
  }

  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));

    this.invoiceService.getInvoices().pipe(
      switchMap(invoices => {
        const invoice = invoices.find(inv =>
          inv.invoiceDetails.some(d => d.serviceOrderId === orderId)
        );

        if (!invoice) {
          return this.serviceOrderService.getServiceOrderById(orderId).pipe(
            switchMap(order => {
              if (!order) return of(null);
              this.serviceOrder = order;

              return forkJoin({
                vehicle: this.vehicleService.getVehicleBySerialNumber(order.serialNumber),
                clients: this.clientService.getAll(),
                spares: this.spareService.getAll()
              }).pipe(
                switchMap(({ vehicle, clients, spares }) => {
                  if (!vehicle) return of(null);
                  this.vehicle = vehicle;

                  const client = clients.find(c => c.id === vehicle.clientId);
                  if (!client) {
                    console.error('❌ Cliente no encontrado, no se puede generar la factura.');
                    return of(null);
                  }
                  this.client = client;

                  const repuestos: OrderDetail[] = order.orderDetails ?? [];

                  let totalSpares = 0;
                  for (const r of repuestos) {
                    const repuestoCompleto = spares.find(s => s.code === r.spareCode);
                    if (repuestoCompleto) {
                      totalSpares += (repuestoCompleto.unitPrice || 0) * (r.spareQuantity || 0);
                    }
                  }

                  const totalServices = order.unitPrice;
                  const finalAmount = totalServices + totalSpares;

                  const newInvoice: Omit<Invoice, 'id' | 'createdAt'> = {
                    totalSpares,
                    totalServices,
                    finalAmount,
                    clientId: vehicle.clientId,
                    invoiceDetails: [
                      {
                        id: 0,
                        invoiceId: 0,
                        serviceOrderId: orderId,
                        createdAt: new Date()
                      }
                    ]
                  };

                  return this.invoiceService.createInvoice(newInvoice);
                })
              );
            })
          );
        } else {
          this.invoice = invoice;
          const serviceOrderId = invoice.invoiceDetails[0].serviceOrderId;

          return this.serviceOrderService.getServiceOrderById(serviceOrderId).pipe(
            switchMap(order => {
              if (!order) return of(null);
              this.serviceOrder = order;

              return forkJoin({
                vehicle: this.vehicleService.getVehicleBySerialNumber(order.serialNumber),
                clients: this.clientService.getAll()
              });
            })
          );
        }
      })
    ).subscribe(result => {
      if (result && 'id' in result) {
        this.invoice = result as Invoice;
        const serviceOrderId = this.invoice.invoiceDetails[0].serviceOrderId;

        this.serviceOrderService.getServiceOrderById(serviceOrderId).pipe(
          switchMap(order => {
            if (!order) return of(null);
            this.serviceOrder = order;

            return forkJoin({
              vehicle: this.vehicleService.getVehicleBySerialNumber(order.serialNumber),
              clients: this.clientService.getAll()
            });
          })
        ).subscribe(data => {
          this.vehicle = data?.vehicle;
          this.client = data?.clients?.find(c => c.id === this.vehicle?.clientId);
        });

      } else if (result?.vehicle && result?.clients) {
        this.vehicle = result.vehicle;
        this.client = result.clients.find(c => c.id === result.vehicle!.clientId);
      }
    });
  }
}
