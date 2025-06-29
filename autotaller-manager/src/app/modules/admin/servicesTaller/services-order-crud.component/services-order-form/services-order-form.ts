import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ServiceOrder } from '../../../models/service-order';
import { Vehicle } from '../../../models/vehicle';
import { ServiceType } from '../../../models/service-type';
import { UserMember } from '../../../models/user-member';
import { SwalService } from '../../../../../shared/swal.service';
import { MockVehicleService } from '../../../services/mock-vehicle';
import { MockServiceTypeService } from '../../../services/mock-service-type';
import { MockUserService } from '../../../services/mock-user';

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
    approvedByClient: false,
    serialNumber: '',
    serviceStatusId: null!,
    serviceTypeId: null!,
    userMemberId: null!,
    unitPrice: 0
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
    private vehicleService: MockVehicleService,
    private serviceTypeService: MockServiceTypeService,
    private userService: MockUserService,
    private swalService: SwalService
  ) {}

ngOnInit(): void {
  this.vehicleService.getVehicles().subscribe({
    next: (data) => this.vehicles = data,
    error: () => this.swalService.error('Error al cargar los vehículos')
  });

  this.serviceTypeService.getAll().subscribe({
    next: (data) => this.serviceTypes = data,
    error: () => this.swalService.error('Error al cargar tipos de servicio')
  });

  this.userService.getAll().subscribe({
    next: (data) =>
      this.users = data.filter(user =>
        user.role && user.role.toLowerCase() === 'mecánico'
      ),
    error: () => this.swalService.error('Error al cargar los técnicos')
  });

  if (this.serviceOrderToEdit) {
    this.serviceOrder = { ...this.serviceOrderToEdit };
    this.editMode = true;
  }
}


  save(): void {
    if (!this.serviceOrder.description.trim()
      || !this.serviceOrder.serialNumber
      || !this.serviceOrder.serviceStatusId
      || !this.serviceOrder.serviceTypeId
      || !this.serviceOrder.userMemberId
      || this.serviceOrder.unitPrice < 0
    ) {
      this.swalService.error('Por favor completa todos los campos obligatorios');
      return;
    }

    this.formSubmitted.emit(this.serviceOrder);
  }

  cancel(): void {
    this.cancelForm.emit();
  }
}
