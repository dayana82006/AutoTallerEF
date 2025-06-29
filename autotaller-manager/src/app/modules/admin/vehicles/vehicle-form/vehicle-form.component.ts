import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Vehicle } from '../../models/vehicle';
import { VehicleModel } from '../../models/vehicle-model';
import { FuelType } from '../../models/fuel-type';
import { Client } from '../../models/client';
import { VehicleType } from '../../models/vehicle-type';


import { MockFuelTypes } from '../../services/mock-fuel-types';
import { MockVehicleModel } from '../../services/mock-vehicle-models';
import { MockClientService } from '../../services/mock-client';
import { MockVehicleService } from '../../services/mock-vehicle';
import { SwalService } from '../../../../shared/swal.service';
import { MockVehicleTypes } from '../../services/mock-vehicle-types';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicle-form.component.html'
})
export class VehicleFormComponent implements OnInit {
  @Input() vehicleToEdit?: Vehicle | null;
  @Output() formSubmitted = new EventEmitter<void>();
  @Output() cancelForm = new EventEmitter<void>();

  vehicle: Vehicle = {
    serialNumber: '',
    releaseYear: new Date().getFullYear(),
    km: 0,
    vehicleModelId: null!,
    clientId: null!,
    fuelTypeId: null!,
    vehicleTypeId: null!
  };

  vehicleModels: VehicleModel[] = [];
  fuelTypes: FuelType[] = [];
  clients: Client[] = [];
  vehicleTypes: VehicleType[] = [];
  editingSerialNumber: string | null = null;  // CAMBIO
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: MockClientService,
    private vehicleService: MockVehicleService,
    private swalService: SwalService
  ) {}

  ngOnInit(): void {
    this.vehicleModels = MockVehicleModel;
    this.fuelTypes = MockFuelTypes;
    this.vehicleTypes = MockVehicleTypes;

    this.clientService.getAll().subscribe(data => {
      this.clients = data;
    });

    const serial = this.route.snapshot.paramMap.get('id'); // Aquí sigue viniendo como "id" en la URL
    if (serial && serial !== '0') {
      this.editingSerialNumber = serial;
      this.editMode = true;
      this.loadVehicleForEdit(serial);
      return;
    }

    if (this.vehicleToEdit) {
      this.editingSerialNumber = this.vehicleToEdit.serialNumber;
      this.vehicle = { ...this.vehicleToEdit };
      this.editMode = true;
    }
  }

  private loadVehicleForEdit(serialNumber: string): void {
    this.vehicleService.getVehicleBySerialNumber(serialNumber).subscribe({
      next: (vehicle) => {
        if (vehicle) {
          this.vehicle = { ...vehicle };
        } else {
          this.swalService.error('Vehículo no encontrado');
          this.router.navigate(['/admin/vehiculos']);
        }
      },
      error: () => {
        this.swalService.error('Error al cargar el vehículo');
        this.router.navigate(['/admin/vehiculos']);
      }
    });
  }

save(): void {
  this.vehicle.vehicleModelId = Number(this.vehicle.vehicleModelId);
  this.vehicle.clientId = Number(this.vehicle.clientId);
  this.vehicle.fuelTypeId = Number(this.vehicle.fuelTypeId);
  this.vehicle.vehicleTypeId = Number(this.vehicle.vehicleTypeId);

  const serial = this.vehicle.serialNumber.trim();

  if (
    !serial ||
    !this.vehicle.releaseYear ||
    !this.vehicle.km ||
    !this.vehicle.vehicleModelId ||
    !this.vehicle.clientId ||
    !this.vehicle.fuelTypeId
  ) {
    this.swalService.error('Por favor completa todos los campos obligatorios');
    return;
  }

  if (this.editMode && this.editingSerialNumber) {
    this.vehicleService.updateVehicle(this.editingSerialNumber, this.vehicle).subscribe({
      next: () => this.formSubmitted.emit(),
      error: () => this.swalService.error('Error al actualizar el vehículo')
    });
  } else {
    // ✅ Validación previa: verificar si ya existe un vehículo con ese serial
    this.vehicleService.getVehicleBySerialNumber(serial).subscribe({
      next: (existingVehicle) => {
        if (existingVehicle) {
          this.swalService.error(`Ya existe un vehículo con el número de serie "${serial}".`);
        } else {
          // Si no existe, entonces crearlo
          const newVehicle: Omit<Vehicle, 'id'> = {
            serialNumber: serial,
            releaseYear: this.vehicle.releaseYear,
            km: this.vehicle.km,
            vehicleModelId: this.vehicle.vehicleModelId,
            clientId: this.vehicle.clientId,
            fuelTypeId: this.vehicle.fuelTypeId,
            vehicleTypeId: this.vehicle.vehicleTypeId
          };

          this.vehicleService.createVehicle(newVehicle).subscribe({
            next: () => this.formSubmitted.emit(),
            error: () => this.swalService.error('Error al crear el vehículo')
          });
        }
      },
      error: () => {
        this.swalService.error('Error al validar el número de serie');
      }
    });
  }
}


  cancel(): void {
    this.cancelForm.emit();
  }

  trackById(index: number, item: { id: number }) {
    return item.id;
  }
}
