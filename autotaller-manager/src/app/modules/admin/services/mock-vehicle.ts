import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class MockVehicleService {
  private baseUrl = 'http://localhost:5005/api/Vehicle';

  constructor(private http: HttpClient) {}
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.baseUrl);
  }
  
  getAll(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.baseUrl);
  }

  // Obtener un vehículo por su número de serie
  getVehicleBySerialNumber(serialNumber: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.baseUrl}/${serialNumber}`);
  }

  // Crear un nuevo vehículo
  createVehicle(vehicle: Omit<Vehicle, 'id'>): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.baseUrl, vehicle);
  }

  // Actualizar un vehículo existente usando el número de serie
  updateVehicle(serialNumber: string, updatedVehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.baseUrl}/${serialNumber}`, updatedVehicle);
  }

  // Eliminar un vehículo por número de serie
  deleteVehicle(serialNumber: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${serialNumber}`);
  }
}
