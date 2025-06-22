import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Vehicle } from '../../models/vehicle';
import { VehicleModel } from '../../models/vehicle-model';
import { FuelType } from '../../models/fuel-type';
import { Client } from '../../models/client';

import { MockFuelTypes } from '../../services/mock-fuel-types';
import { MockVehicleModel } from '../../services/mock-vehicle-models';
import { MockClientService } from '../../services/mock-client';
import { MockVehicleService } from '../../services/mock-vehicle';
import { SwalService } from '../../../../shared/swal.service';

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
    id: 0,
    serialNumber: '',
    releaseYear: new Date().getFullYear(),
    km: 0,
    vehicleModelId: null!,
    clientId: null!,
    fuelTypeId: null!
  };

  vehicleModels: VehicleModel[] = [];
  fuelTypes: FuelType[] = [];
  clients: Client[] = [];

  editingId: number | null = null;
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

    this.clientService.getClients().subscribe((data) => {
      this.clients = data;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== '0') {
      this.editingId = +id;
      this.editMode = true;
      this.loadVehicleForEdit(this.editingId);
      return; 
    }

    if (this.vehicleToEdit) {
      this.editingId = this.vehicleToEdit.id;
      this.vehicle = { ...this.vehicleToEdit };
      this.editMode = true;
    }
  }

  private loadVehicleForEdit(id: number): void {
    this.vehicleService.getVehicleById(id).subscribe((vehicle) => {
      if (vehicle) {
        this.vehicle = { ...vehicle };
      } else {
        this.swalService.error('Vehículo no encontrado');
        this.router.navigate(['/admin/vehiculos']);
      }
    });
  }

  save(): void {
  this.vehicle.vehicleModelId = Number(this.vehicle.vehicleModelId);
  this.vehicle.clientId = Number(this.vehicle.clientId);
  this.vehicle.fuelTypeId = Number(this.vehicle.fuelTypeId);

  if (
    !this.vehicle.serialNumber.trim() ||
    !this.vehicle.releaseYear ||
    !this.vehicle.km ||
    !this.vehicle.vehicleModelId ||
    !this.vehicle.clientId ||
    !this.vehicle.fuelTypeId
  ) {
    this.swalService.error('Por favor completa todos los campos obligatorios');
    return;
  }

  if (this.editMode && this.editingId !== null) {
    const updatedVehicle: Vehicle = {
      ...this.vehicle,
      id: this.editingId
    };

    this.vehicleService.updateVehicle(this.editingId, updatedVehicle).subscribe({
      next: () => this.formSubmitted.emit(),
      error: () => this.swalService.error('Error al actualizar el vehículo')
    });
  } else {
    const newVehicle: Omit<Vehicle, 'id'> = {
      serialNumber: this.vehicle.serialNumber.trim(),
      releaseYear: this.vehicle.releaseYear,
      km: this.vehicle.km,
      vehicleModelId: this.vehicle.vehicleModelId,
      clientId: this.vehicle.clientId,
      fuelTypeId: this.vehicle.fuelTypeId
    };

    this.vehicleService.createVehicle(newVehicle).subscribe({
      next: () => this.formSubmitted.emit(),
      error: () => this.swalService.error('Error al crear el vehículo')
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
