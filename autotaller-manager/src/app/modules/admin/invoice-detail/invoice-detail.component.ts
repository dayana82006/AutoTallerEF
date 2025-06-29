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
    console.log('📦 ID de la orden desde la URL:', orderId);

    this.invoiceService.getInvoices().pipe(
      switchMap(invoices => {
        const invoice = invoices.find(inv =>
          inv.invoiceDetails.some(d => d.serviceOrderId === orderId)
        );

        if (!invoice) {
          console.log('⚠️ No se encontró factura, intentando crear una nueva...');

          return this.serviceOrderService.getServiceOrderById(orderId).pipe(
            switchMap(order => {
              if (!order) {
                console.log('❌ No se encontró la orden');
                return of(null);
              }

              this.serviceOrder = order;

              return this.vehicleService.getVehicleBySerialNumber(order.serialNumber).pipe(
                switchMap(vehicle => {
                  if (!vehicle) {
                    console.log('❌ No se encontró el vehículo');
                    return of(null);
                  }

                  this.vehicle = vehicle;

                  const newInvoice: Omit<Invoice, 'id' | 'createdAt'> = {
                    totalSpares: 70000,
                    totalServices: order.unitPrice,
                    finalAmount: order.unitPrice + 70000,
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

                  console.log('✅ Creando factura con:', newInvoice);
                  return this.invoiceService.createInvoice(newInvoice);
                })
              );
            })
          );
        } else {
          console.log('✅ Factura encontrada:', invoice);
          this.invoice = invoice;

          const serviceOrderId = invoice.invoiceDetails[0].serviceOrderId;

          return this.serviceOrderService.getServiceOrderById(serviceOrderId).pipe(
            switchMap(order => {
              if (!order) {
                console.log('❌ No se encontró la orden asociada a la factura');
                return of(null);
              }

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
      } else {
        console.log('⚠️ No se pudo cargar toda la información');
      }
    });
  }
}
