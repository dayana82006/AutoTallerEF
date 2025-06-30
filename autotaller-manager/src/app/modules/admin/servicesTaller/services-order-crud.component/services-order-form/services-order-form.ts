import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { ServiceOrder } from '../../../models/service-order';
import { Vehicle } from '../../../models/vehicle';
import { ServiceType } from '../../../models/service-type';
import { UserMember } from '../../../models/user-member';
import { Invoice } from '../../../models/invoice';
import { Spare } from '../../../models/spare';
import { OrderDetail } from '../../../models/order-detail';

import { SwalService } from '../../../../../shared/swal.service';
import { MockVehicleService } from '../../../services/mock-vehicle';
import { MockServiceTypeService } from '../../../services/mock-service-type';
import { MockUserService } from '../../../services/mock-user';
import { MockInvoiceService } from '../../../services/mock-invoice';
import { MockSpareService } from '../../../services/mock-spares';
import { MockOrderDetailService } from '../../../services/mock-order-detail';

@Component({
  selector: 'app-service-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './services-order-form.html',
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
    unitPrice: 0,
    invoiceId: null!,
  };

  repuestosSeleccionados: { codeSpare: number | null; spareQuantity: number }[] = [];
  spares: Spare[] = [];

  vehicles: Vehicle[] = [];
  serviceTypes: ServiceType[] = [];
  users: UserMember[] = [];
  invoices: Invoice[] = [];

  statuses = [
    { id: 1, description: 'Pendiente' },
    { id: 2, description: 'En proceso' },
    { id: 3, description: 'Finalizado' },
  ];

  editMode = false;

  constructor(
    private vehicleService: MockVehicleService,
    private serviceTypeService: MockServiceTypeService,
    private userService: MockUserService,
    private invoiceService: MockInvoiceService,
    private spareService: MockSpareService,
    private orderDetailService: MockOrderDetailService,
    private swalService: SwalService
  ) {}

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (data) => (this.vehicles = data),
      error: () => this.swalService.error('Error al cargar los vehículos'),
    });

    this.serviceTypeService.getAll().subscribe({
      next: (data) => (this.serviceTypes = data),
      error: () => this.swalService.error('Error al cargar tipos de servicio'),
    });

   this.userService.getAll().subscribe({
  next: data =>
    this.users = data.filter(user =>
      Array.isArray(user.role) &&
      user.role.some(r => r.toLowerCase() === 'Mecanico')
    ),
  error: () => this.swalService.error('Error al cargar técnicos')
});


    this.invoiceService.getInvoices().subscribe({
      next: (data) => (this.invoices = data),
      error: () => this.swalService.error('Error al cargar facturas'),
    });

    this.spareService.getAll().subscribe({
      next: (data) => (this.spares = data),
      error: () => this.swalService.error('Error al cargar repuestos'),
    });

    if (this.serviceOrderToEdit) {
      this.serviceOrder = { ...this.serviceOrderToEdit };
      this.editMode = true;
    }
  }

  agregarRepuesto(): void {
    this.repuestosSeleccionados.push({ codeSpare: null, spareQuantity: 1 });
  }

  eliminarRepuesto(index: number): void {
    this.repuestosSeleccionados.splice(index, 1);
  }

  save(): void {
    const s = this.serviceOrder;

    if (
      !s.description?.trim() ||
      !s.serialNumber ||
      !s.serviceStatusId ||
      !s.serviceTypeId ||
      !s.userMemberId ||
      !s.invoiceId ||
      s.unitPrice < 0
    ) {
      this.swalService.error('Por favor completa todos los campos obligatorios');
      return;
    }

    this.formSubmitted.emit(s);

    if (this.repuestosSeleccionados.length > 0 && s.id) {
    const detalles: OrderDetail[] = this.repuestosSeleccionados.map((r, i) => ({
      id: 0,
      idServiceOrder: this.serviceOrder.id,
      spareCode: String(r.codeSpare), 
      spareQuantity: r.spareQuantity,
      createdAt: new Date(),
      updatedAt: new Date()
    }));


      forkJoin(detalles.map((d) => this.orderDetailService.create(d))).subscribe({
        next: () => this.swalService.success('Orden guardada con repuestos'),
        error: () => this.swalService.error('Error al guardar repuestos'),
      });
    }
  }

  cancel(): void {
    this.cancelForm.emit();
  }
}
