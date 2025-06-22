import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockVehicleService {
  private vehicles: Vehicle[] = [
    {
      id: 1,
      serialNumber: 'ABC123XYZ',
      releaseYear: 2020,
      km: 35000,
      vehicleModelId: 1,
      clientId: 1,
      fuelTypeId: 2,
      vehicleTypeId: 1
    },
    {
      id: 2,
      serialNumber: 'DEF456LMN',
      releaseYear: 2019,
      km: 54000,
      vehicleModelId: 2,
      clientId: 2,
      fuelTypeId: 1,
      vehicleTypeId: 1
    }
  ];

  getVehicles(): Observable<Vehicle[]> {
    return of(this.vehicles).pipe(delay(300));
  }

  getVehicleById(id: number): Observable<Vehicle | undefined> {
    const vehicle = this.vehicles.find(v => v.id === id);
    return of(vehicle).pipe(delay(300));
  }

  createVehicle(vehicle: Omit<Vehicle, 'id'>): Observable<Vehicle> {
    const newId = this.vehicles.length > 0 ? Math.max(...this.vehicles.map(v => v.id)) + 1 : 1;
    const newVehicle: Vehicle = { id: newId, ...vehicle };
    this.vehicles.push(newVehicle);
    return of(newVehicle).pipe(delay(300));
  }

  updateVehicle(id: number, updatedVehicle: Vehicle): Observable<Vehicle | undefined> {
    const index = this.vehicles.findIndex(v => v.id === id);
    if (index !== -1) {
      this.vehicles[index] = { ...updatedVehicle };
      return of(this.vehicles[index]).pipe(delay(300));
    }
    return of(undefined).pipe(delay(300));
  }

  deleteVehicle(id: number): Observable<boolean> {
    const index = this.vehicles.findIndex(v => v.id === id);
    if (index !== -1) {
      this.vehicles.splice(index, 1);
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }
}
