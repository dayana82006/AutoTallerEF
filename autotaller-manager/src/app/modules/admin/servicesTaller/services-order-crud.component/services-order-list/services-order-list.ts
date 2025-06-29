import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ServiceOrder } from '../../../models/service-order';
import { ServiceType } from '../../../models/service-type';
import { Vehicle } from '../../../models/vehicle';
import { UserMember } from '../../../models/user-member';
import { OrderDetail } from '../../../models/order-detail';

import { MockServiceOrderService } from '../../../services/mock-service-order';
import { MockServiceTypeService } from '../../../services/mock-service-type';
import { MockVehicleService } from '../../../services/mock-vehicle';
import { MockUserService } from '../../../services/mock-user';

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

  statuses = [
    { id: 1, description: 'Pendiente' },
    { id: 2, description: 'En proceso' },
    { id: 3, description: 'Finalizado' }
  ];

  constructor(
    private serviceOrderService: MockServiceOrderService,
    private vehicleService: MockVehicleService,
    private serviceTypeService: MockServiceTypeService,
    private userService: MockUserService,
    private swalService: SwalService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.refreshOrders();

    this.serviceTypeService.getAll().subscribe({
      next: (data) => this.serviceTypes = data,
      error: () => this.swalService.error('Error al cargar tipos de servicio')
    });

    this.vehicleService.getVehicles().subscribe({
      next: (data) => this.vehicles = data,
      error: () => this.swalService.error('Error al cargar vehículos')
    });

    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data.filter(user =>
          Array.isArray(user.role) &&
          user.role.map(r => r.toLowerCase()).includes('mecánico')
        );

      },
      error: () => this.swalService.error('Error al cargar usuarios')
    });
  }

  private refreshOrders(): void {
    this.serviceOrderService.getServiceOrders().subscribe((orders) => {
      this.allServiceOrders = orders;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const filtered = this.allServiceOrders.filter((o) =>
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
        this.serviceOrderService.deleteServiceOrder(id).subscribe(() => this.refreshOrders());
      }
    });
  }

  viewInvoice(orderId: number): void {
    this.router.navigate(['/admin/invoices', orderId]);
  }

  onFormSubmit(order: ServiceOrder): void {
    if (this.selectedServiceOrder) {
      this.serviceOrderService.updateServiceOrder(order.id, order).subscribe(() => {
        this.swalService.success('Orden actualizada');
        this.refreshOrders();
      });
    } else {
      this.serviceOrderService.createServiceOrder(order).subscribe((createdOrder) => {
        this.swalService.success('Orden creada');
  onFormSubmit(order: ServiceOrder): void {
    if (this.selectedServiceOrder) {
      this.serviceOrderService.updateServiceOrder(order.id, order).subscribe(() => {
        this.swalService.success('Orden actualizada');
        this.refreshOrders();
      });
    } else {
      this.serviceOrderService.createServiceOrder(order).subscribe((createdOrder) => {
        this.swalService.success('Orden creada');

        if (order.invoiceId) {
          this.serviceOrderService.linkInvoice(createdOrder.id, order.invoiceId).subscribe({
            next: () => this.swalService.success('Factura vinculada'),
            error: () => this.swalService.error('Error al vincular la factura')
          });
        }

        this.refreshOrders();
      });
    }
        this.refreshOrders();
      });
    }

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
  getVehicleDescription(serial: string | null | undefined): string {
    return serial?.trim() || '—';
  }

mostrarRepuestos(orderId: number): void {
  const orden = this.allServiceOrders.find(o => o.id === orderId);

  if (!orden || !orden.orderDetails || orden.orderDetails.length === 0) {
    this.swalService.info('Esta orden no tiene repuestos asociados.');
    return;
  }

  const lista = orden.orderDetails.map((detalle, index) => {
    return `<li>Repuesto ID: <strong>${detalle.spareCode}</strong> – Cantidad: <strong>${detalle.spareQuantity}</strong></li>`;
  }).join('');

  this.swalService.custom({
    icon: 'info',
    title: 'Repuestos de la Orden',
    html: `<ul style="text-align: left; padding-left: 1rem;">${lista}</ul>`,
    confirmButtonText: 'Cerrar'
  });
}


}
