import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { Vehicle } from '../../models/vehicle';
import { Client } from '../../models/client';
import { FuelType } from '../../models/fuel-type';
import { VehicleModel } from '../../models/vehicle-model';
import { VehicleType } from '../../models/vehicle-type';

import { MockVehicleService } from '../../services/mock-vehicle';
import { MockClientService } from '../../services/mock-client';

import { VehicleFormComponent } from '../vehicle-form/vehicle-form.component';
import { MockFuelTypes } from '../../services/mock-fuel-types';
import { MockVehicleModel } from '../../services/mock-vehicle-models';
import { MockVehicleTypes } from '../../services/mock-vehicle-types';
import { SwalService } from '../../../../shared/swal.service';
import { AuthService } from '../../../auth/services/auth';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, FormsModule, VehicleFormComponent],
  templateUrl: './vehicle-list.component.html',
})
export class VehicleListComponent implements OnInit {
  allVehicles: Vehicle[] = [];
  vehicles: Vehicle[] = [];
  clients: Client[] = [];
  vehicleTypes: VehicleType[] = MockVehicleTypes;
  fuelTypes: FuelType[] = MockFuelTypes;
  models: VehicleModel[] = MockVehicleModel;

  selectedVehicle?: Vehicle | null;
  showForm = false;
  total = 0;
  page = 1;
  pageSize = 5;
  search = '';

  constructor(
    private vehicleService: MockVehicleService,
    private clientService: MockClientService,
    private swalService: SwalService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    forkJoin({
      clients: this.clientService.getAll(),
      vehicles: this.vehicleService.getVehicles()
    }).subscribe(({ clients, vehicles }) => {
      this.clients = clients;
      this.allVehicles = vehicles;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const filtered = this.allVehicles.filter((v) =>
      v.serialNumber?.toLowerCase().includes(this.search.toLowerCase())
    );

    this.total = filtered.length;
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.vehicles = filtered.slice(start, end);
  }

getClientName(id: number): string {
  const client = this.clients.find(c => c.id === id);
  if (!client) console.warn('Cliente no encontrado con ID:', id);
  return client ? `${client.name} ${client.lastname}` : 'Desconocido';
}

getModelName(id: number): string {
  const model = this.models.find(m => m.id === id);
  if (!model) console.warn('Modelo no encontrado con ID:', id);
  return model ? model.name : 'Desconocido';
}

getFuelTypeName(id: number): string {
  const fuel = this.fuelTypes.find(f => f.id === id);
  if (!fuel) console.warn('Tipo de combustible no encontrado con ID:', id);
  return fuel ? fuel.name : 'Desconocido';

}getVehicleTypeName(id: number): string {
  const type = this.vehicleTypes.find(t => t.id === id);
  if (!type) console.warn('Tipo de vehículo no encontrado con ID:', id);
  return type ? type.name : 'Desconocido';
}

  newVehicle(): void {
    this.selectedVehicle = null;
    this.showForm = true;
  }

  edit(vehicle: Vehicle): void {
    this.selectedVehicle = vehicle;
    this.showForm = true;
  }

delete(id: number): void {
  this.swalService.confirm('¿Eliminar vehículo?', 'Esta acción no se puede deshacer.').then(confirmed => {
    if (confirmed) {
      this.vehicleService.deleteVehicle(id).subscribe(() => this.ngOnInit());
    }
  });
}

onFormSubmit(): void {
  this.selectedVehicle = null;
  this.showForm = false;

  forkJoin({
    clients: this.clientService.getAll(),
    vehicles: this.vehicleService.getVehicles()
  }).subscribe(({ clients, vehicles }) => {
    this.clients = clients;
    this.allVehicles = vehicles;
    this.applyFilters();
  });
}
  cancelForm(): void {
    this.selectedVehicle = null;
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
