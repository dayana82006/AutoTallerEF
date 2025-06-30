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
    forkJoin({
      vehicles: this.vehicleService.getVehicles(),
      serviceTypes: this.serviceTypeService.getAll(),
      users: this.userService.getAll(),
      invoices: this.invoiceService.getInvoices(),
      spares: this.spareService.getAll()
    }).subscribe({
      next: ({ vehicles, serviceTypes, users, invoices, spares }) => {
        this.vehicles = vehicles;
        this.serviceTypes = serviceTypes;
        this.users = users.filter(u =>
          Array.isArray(u.role)
            ? u.role.includes('Mecanico') || u.role.includes('mecanico')
            : u.role === 'Mecanico' || u.role === 'mecanico'
        );
        this.invoices = invoices;
        this.spares = spares;
      },
      error: () => this.swalService.error('Error al cargar datos del formulario')
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
    const s = { ...this.serviceOrder };

    if (
      !s.description?.trim() ||
      !s.serialNumber?.trim() ||
      !s.serviceStatusId || s.serviceStatusId <= 0 ||
      !s.serviceTypeId || s.serviceTypeId <= 0 ||
      !s.userMemberId || s.userMemberId <= 0 ||
      s.unitPrice < 0
    ) {
      this.swalService.error('Por favor completa todos los campos obligatorios correctamente');
      return;
    }

    if (!s.invoiceId || s.invoiceId <= 0) {
      delete s.invoiceId;
    }

    if (!this.editMode || s.id === 0) {
      delete s.id;
    }

    // Emitir la orden sin repuestos, el padre la guarda y luego llama guardarRepuestosParaOrden()
    this.formSubmitted.emit(s);
  }

  /**
   * Este método debe ser invocado por el padre después de crear la orden.
   */
  guardarRepuestosParaOrden(orderId: number): void {
    const detalles: OrderDetail[] = this.repuestosSeleccionados
      .filter(r => r.codeSpare !== null && r.spareQuantity > 0)
      .map((r) => ({
        id: 0,
        idServiceOrder: orderId,
        spareCode: String(r.codeSpare!),
        spareQuantity: r.spareQuantity,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

    if (detalles.length === 0) return;

    const creaciones$ = detalles.map(detalle =>
      this.orderDetailService.create(detalle)
    );

    forkJoin(creaciones$).subscribe({
      next: () => this.swalService.success('Repuestos guardados correctamente'),
      error: () => this.swalService.error('Error al guardar los repuestos')
    });
  }

  cancel(): void {
    this.cancelForm.emit();
  }
}
