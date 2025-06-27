import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ServiceOrder } from '../../../models/service-order';
import { MockServiceOrderService } from '../../../services/mock-service-order';
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

  // 🔧 Datos mock locales
  serviceTypes = [
    { id: 1, description: 'Cambio de aceite' },
    { id: 2, description: 'Mantenimiento general' }
  ];

  users = [
    { id: 1, name: 'Carlos', lastname: 'Ramírez' },
    { id: 2, name: 'Laura', lastname: 'López' }
  ];

  statuses = [
    { id: 1, description: 'Pendiente' },
    { id: 2, description: 'En proceso' },
    { id: 3, description: 'Finalizado' }
  ];

  constructor(
    private serviceOrderService: MockServiceOrderService,
    private swalService: SwalService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refreshOrders();
  }

  private refreshOrders(): void {
    this.serviceOrderService.getServiceOrders().subscribe((orders) => {
      this.allServiceOrders = orders;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const filtered = this.allServiceOrders.filter((o) =>
      o.serialNumber.toLowerCase().includes(this.search.toLowerCase())
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
      this.serviceOrderService.createServiceOrder(order).subscribe(() => {
        this.swalService.success('Orden creada');
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

  // ✅ Métodos auxiliares para mostrar info en la tabla
  getServiceTypeDescription(id: number): string {
    return this.serviceTypes.find(t => t.id === id)?.description ?? 'Desconocido';
  }

  getUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? `${user.name} ${user.lastname}` : 'Desconocido';
  }

  getStatusDescription(statusId: number): string {
    return this.statuses.find(s => s.id === statusId)?.description ?? 'Desconocido';
  }
}
