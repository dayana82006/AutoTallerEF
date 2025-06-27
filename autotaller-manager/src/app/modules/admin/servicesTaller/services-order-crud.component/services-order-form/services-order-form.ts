import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ServiceOrder } from '../../../models/service-order';
import { Vehicle } from '../../../models/vehicle';
import { ServiceType } from '../../../models/service-type';
import { UserMember } from '../../../models/user-member';
import { SwalService } from '../../../../../shared/swal.service';

@Component({
  selector: 'app-service-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './services-order-form.html'
})
export class ServiceOrderFormComponent implements OnInit {
  @Input() serviceOrderToEdit?: ServiceOrder | null;
  @Output() formSubmitted = new EventEmitter<ServiceOrder>();
  @Output() cancelForm = new EventEmitter<void>();

  serviceOrder: ServiceOrder = {
    id: 0,
    description: '',
    clientApproved: false,
    serialNumber: null!,
    serviceType: null!,
    UserMember: null!,
    unitPrice: 0,
    status: null!
  };

  vehicles: Vehicle[] = [];
  serviceTypes: ServiceType[] = [];
  users: UserMember[] = [];
  statuses = [
    { id: 1, description: 'Pendiente' },
    { id: 2, description: 'En proceso' },
    { id: 3, description: 'Finalizado' }
  ];

  editMode = false;

  constructor(
    private router: Router,
    private swalService: SwalService
  ) {}

  ngOnInit(): void {
    this.vehicles = [
      { id: 1, serialNumber: 'ABC123', releaseYear: 2020, km: 10000, vehicleModelId: 1, clientId: 1, fuelTypeId: 1, vehicleTypeId: 1 },
      { id: 2, serialNumber: 'XYZ789', releaseYear: 2019, km: 20000, vehicleModelId: 2, clientId: 2, fuelTypeId: 2, vehicleTypeId: 2 }
    ];

    this.serviceTypes = [
      { id: 1, description: 'Cambio de aceite' },
      { id: 2, description: 'Mantenimiento general' }
    ];

    this.users = [
      {
        id: 1, name: 'Carlos', lastname: 'Ramírez', email: 'carlos@taller.com', role: 'Operario', specialties: [],
        username: ''
      },
      {
        id: 2, name: 'Laura', lastname: 'López', email: 'laura@taller.com', role: 'Operario', specialties: [],
        username: ''
      }
    ];

    if (this.serviceOrderToEdit) {
      this.serviceOrder = { ...this.serviceOrderToEdit };
      this.editMode = true;
    }
  }

  save(): void {
    if (
      !this.serviceOrder.description.trim() ||
      !this.serviceOrder.serialNumber ||
      !this.serviceOrder.serviceType ||
      !this.serviceOrder.UserMember ||
      !this.serviceOrder.status ||
      this.serviceOrder.unitPrice < 0
    ) {
      this.swalService.error('Por favor completa todos los campos obligatorios');
      return;
    }

    this.swalService.success(this.editMode ? 'Orden actualizada' : 'Orden creada');
    this.formSubmitted.emit(this.serviceOrder);
  }

  cancel(): void {
    this.cancelForm.emit();
  }

  trackById(index: number, item: { id: number }) {
    return item.id;
  }
}
