import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ServiceOrder } from '../../../models/service-order';
import { ServiceType } from '../../../models/service-type';
import { Vehicle } from '../../../models/vehicle';
import { UserMember } from '../../../models/user-member';
import { OrderDetail } from '../../../models/order-detail';

import { MockServiceOrderService } from '../../../services/mock-service-order';
import { MockServiceTypeService } from '../../../services/mock-service-type';
import { MockVehicleService } from '../../../services/mock-vehicle';
import { MockUserService } from '../../../services/mock-user';
import { MockOrderDetailService } from '../../../services/mock-order-detail';

import { SwalService } from '../../../../../shared/swal.service';
import { ServiceOrderFormComponent } from '../services-order-form/services-order-form';
import { AuthService } from '../../../../auth/services/auth';

@Component({
  selector: 'app-service-order-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ServiceOrderFormComponent],
  templateUrl: './services-order-list.html',
})
export class ServiceOrderListComponent implements OnInit {
  allServiceOrders: ServiceOrder[] = [];
  serviceOrders: ServiceOrder[] = [];

  selectedServiceOrder?: ServiceOrder | null;
  showForm = false;
  total = 0;
  page = 1;
  pageSize = 5;
  search = '';

  selectedInvoiceOrderId?: number;

  serviceTypes: ServiceType[] = [];
  users: UserMember[] = [];
  vehicles: Vehicle[] = [];
  orderDetails: OrderDetail[] = [];

  statuses = [
    { id: 1, description: 'Pendiente' },
    { id: 2, description: 'En proceso' },
    { id: 3, description: 'Finalizado' }
  ];

  @ViewChild(ServiceOrderFormComponent)
  formComponent!: ServiceOrderFormComponent;

  constructor(
    private serviceOrderService: MockServiceOrderService,
    private vehicleService: MockVehicleService,
    private serviceTypeService: MockServiceTypeService,
    private userService: MockUserService,
    private orderDetailService: MockOrderDetailService,
    private swalService: SwalService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    forkJoin({
      orders: this.serviceOrderService.getServiceOrders().pipe(catchError(() => of([]))),
      serviceTypes: this.serviceTypeService.getAll().pipe(catchError(() => of([]))),
      users: this.userService.getAll().pipe(catchError(() => of([]))),
      vehicles: this.vehicleService.getVehicles().pipe(catchError(() => of([]))),
      details: this.orderDetailService.getAll().pipe(catchError(() => of([])))
    }).subscribe({
      next: ({ orders, serviceTypes, users, vehicles, details }) => {
        this.serviceTypes = serviceTypes;
        this.users = users;
        this.vehicles = vehicles;
        this.orderDetails = details;

        this.allServiceOrders = orders.map(order => ({
          ...order,
          orderDetails: details.filter(d => d.serviceOrderId === order.id)
        }));

        this.applyFilters();
      },
      error: () => {
        this.swalService.error('Error al cargar datos de órdenes de servicio');
      }
    });
  }

  applyFilters(): void {
    const filtered = this.allServiceOrders.filter(o =>
      (o.serialNumber ?? '').toLowerCase().includes(this.search.toLowerCase())
    );
    this.total = filtered.length;
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.serviceOrders = filtered.slice(start, end);
  }

  newServiceOrder(): void {
    this.selectedServiceOrder = null;
    this.showForm = true;
  }

  edit(order: ServiceOrder): void {
    this.selectedServiceOrder = order;
    this.showForm = true;
  }

  delete(id: number): void {
    this.swalService.confirm('¿Eliminar orden?', 'Esta acción no se puede deshacer.').then(confirmed => {
      if (confirmed) {
        this.serviceOrderService.deleteServiceOrder(id).subscribe(() => this.loadData());
      }
    });
  }

  viewInvoice(orderId: number | undefined): void {
    if (orderId !== undefined) {
      this.router.navigate(['/admin/invoices', orderId]);
    } else {
      this.swalService.error('ID de orden inválido');
    }
  }

onFormSubmit(data: { order: ServiceOrder, repuestos: OrderDetail[] }): void {
  const { order, repuestos } = data;

  if (!order || order.id === undefined) {
    this.swalService.error('Orden creada, pero no se recibió un ID válido');
    return;
  }

  const repuestosValidos = repuestos.filter(r =>
    r.serviceOrderId && r.spareCode && r.spareQuantity > 0
  );

  const creaciones$ = repuestosValidos.map(r => this.orderDetailService.create(r));

  forkJoin(creaciones$).subscribe({
    next: () => {
      this.serviceOrderService.createInvoiceForOrder(order.id!).subscribe({
        next: () => {
          this.swalService.success('Factura y repuestos creados correctamente');
          this.loadData();
        },
        error: () => this.swalService.error('No se pudo crear la factura')
      });
    },
    error: () => this.swalService.error('Fallo al guardar repuestos')
  });

  this.selectedServiceOrder = null;
  this.showForm = false;
}


  cancelForm(): void {
    this.selectedServiceOrder = null;
    this.showForm = false;
  }

  onSearchChange(): void {
    this.page = 1;
    this.applyFilters();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.applyFilters();
  }

  getServiceTypeDescription(id: number): string {
    return this.serviceTypes.find(t => t.id === id)?.description ?? 'Desconocido';
  }

  getUserName(userMemberId: number): string {
    const user = this.users.find(u => u.id === userMemberId);
    return user ? `${user.name} ${user.lastname}` : 'Desconocido';
  }

  getStatusDescription(statusId: number): string {
    return this.statuses.find(s => s.id === statusId)?.description ?? 'Desconocido';
  }

  getVehicleDescription(serial: string | null | undefined): string {
    return serial?.trim() || '—';
  }

  mostrarRepuestos(orderId: number | undefined): void {
    if (orderId === undefined) {
      this.swalService.error('ID de orden inválido');
      return;
    }

    const orden = this.allServiceOrders.find(o => o.id === orderId);

    if (!orden || !orden.orderDetails || orden.orderDetails.length === 0) {
      this.swalService.info('Esta orden no tiene repuestos asociados.');
      return;
    }

    const lista = orden.orderDetails.map((detalle) =>
      `<li>Repuesto ID: <strong>${detalle.spareCode}</strong> – Cantidad: <strong>${detalle.spareQuantity}</strong></li>`
    ).join('');

    this.swalService.custom({
      icon: 'info',
      title: 'Repuestos de la Orden',
      html: `<ul style="text-align: left; padding-left: 1rem;">${lista}</ul>`,
      confirmButtonText: 'Cerrar'
    });
  }
}
