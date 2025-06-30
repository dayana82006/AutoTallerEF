import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleAnormality } from '../models/vehicle-anormality';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MockAnormalityService {
  private baseUrl = 'http://localhost:5005/api/VehicleAnormality';

  constructor(private http: HttpClient) {}

  getAll(): Observable<VehicleAnormality[]> {
    return this.http.get<VehicleAnormality[]>(this.baseUrl);
  }

  getById(id: number): Observable<VehicleAnormality> {
    return this.http.get<VehicleAnormality>(`${this.baseUrl}/${id}`);
  }

  create(anormality: Omit<VehicleAnormality, 'id'>): Observable<VehicleAnormality> {
    return this.http.post<VehicleAnormality>(this.baseUrl, anormality);
  }

  update(id: number, updated: VehicleAnormality): Observable<VehicleAnormality> {
    return this.http.put<VehicleAnormality>(`${this.baseUrl}/${id}`, updated);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
