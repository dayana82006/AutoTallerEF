import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ServiceOrder } from '../../../models/service-order';
import { MockServiceOrderService } from '../../../services/mock-service-order';
import { ServiceTypesCrudComponent } from '../../services-type-crud.component/services-type-crud.component';
import { SwalService } from '../../../../../shared/swal.service';
import { ServiceOrderFormComponent } from '../services-order-form/services-order-form';

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

  constructor(
    private serviceOrderService: MockServiceOrderService,
    private swalService: SwalService
  ) {}

  ngOnInit(): void {
    this.serviceOrderService.getServiceOrders().subscribe((orders) => {
      this.allServiceOrders = orders;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const filtered = this.allServiceOrders.filter((o) =>
      o.serialNumber.serialNumber.toLowerCase().includes(this.search.toLowerCase())
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
        this.serviceOrderService.deleteServiceOrder(id).subscribe(() => this.ngOnInit());
      }
    });
  }

  onFormSubmit(): void {
    this.selectedServiceOrder = null;
    this.showForm = false;
    this.ngOnInit(); // recargar lista
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
}
