import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ServiceOrder } from '../../../admin/models/service-order';
import { MockServiceOrderService } from '../../../admin/services/mock-service-order';

@Component({
  selector: 'app-public-order-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-search.html',
})
export class OrderSearch implements OnInit {
  serial: string = '';
  orders: ServiceOrder[] = [];
  found = false;
  searched = false;

  // Lista de estados
  statuses = [
    { id: 1, description: 'Pendiente' },
    { id: 2, description: 'En proceso' },
    { id: 3, description: 'Finalizado' },
  ];

  constructor(private serviceOrderService: MockServiceOrderService) {}

  ngOnInit(): void {}

  searchOrders(): void {
    this.searched = true;
    const serialCleaned = this.serial.trim().toLowerCase();

    if (!serialCleaned) return;

    this.serviceOrderService.getServiceOrders().subscribe((allOrders) => {
      this.orders = allOrders.filter(
        (order) => order.serialNumber.trim().toLowerCase() === serialCleaned
      );

      this.found = this.orders.length > 0;

      if (!this.found) {
        Swal.fire({
          icon: 'warning',
          title: 'Sin coincidencias',
          text: 'No se encontraron órdenes con esa serial.',
          confirmButtonColor: '#3085d6',
          background: '#212529',
          color: '#fff',
        });
      }
    });
  }

  // Método para obtener descripción del estado
  getStatusDescription(statusId: number): string {
    return this.statuses.find((s) => s.id === statusId)?.description ?? 'Desconocido';
  }
}
