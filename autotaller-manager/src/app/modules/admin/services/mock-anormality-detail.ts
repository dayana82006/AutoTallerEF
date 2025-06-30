import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleAnormalityDetail } from '../models/vehicle-anormality-detail';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MockAnormalityDetailService {
  private apiUrl = 'http://localhost:5005/api/VehicleAnormalityDetail';

  constructor(private http: HttpClient) {}

  getAll(): Observable<VehicleAnormalityDetail[]> {
    return this.http.get<VehicleAnormalityDetail[]>(this.apiUrl);
  }

  create(detail: Omit<VehicleAnormalityDetail, 'id' | 'createdAt' | 'updatedAt'>): Observable<VehicleAnormalityDetail> {
    return this.http.post<VehicleAnormalityDetail>(this.apiUrl, detail);
  }

  update(id: number, detail: VehicleAnormalityDetail): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, detail);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
