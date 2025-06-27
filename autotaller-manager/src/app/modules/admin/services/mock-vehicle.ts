import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../models/vehicle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockVehicleService {
  private baseUrl = 'http://localhost:5005/api/Vehicle';

  constructor(private http: HttpClient) {}

  // Obtener todos los vehículos
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.baseUrl);
  }

  // Obtener un vehículo por su serial number (no por ID)
  getVehicleBySerialNumber(serialNumber: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.baseUrl}/${serialNumber}`);
  }

  // Crear un nuevo vehículo
  createVehicle(vehicle: Omit<Vehicle, 'id'>): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.baseUrl, vehicle);
  }

  // Actualizar un vehículo existente usando serialNumber
  updateVehicle(serialNumber: string, updatedVehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.baseUrl}/${serialNumber}`, updatedVehicle);
  }

  // Eliminar un vehículo por serialNumber
  deleteVehicle(serialNumber: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${serialNumber}`);
  }
}
