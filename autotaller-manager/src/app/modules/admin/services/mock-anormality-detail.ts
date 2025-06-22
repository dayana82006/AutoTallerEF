import { Injectable } from '@angular/core';
import { VehicleAnormalityDetail } from '../models/vehicle-anormality-detail';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MockAnormalityDetailService {
  private details: VehicleAnormalityDetail[] = [
    { id: 1, idAnormality: 1, serialNumber: 'ABC123XYZ' },
    { id: 2, idAnormality: 2, serialNumber: 'DEF456LMN' }
  ];

  getAll(): Observable<VehicleAnormalityDetail[]> {
    return of(this.details).pipe(delay(300));
  }

create(detail: Omit<VehicleAnormalityDetail, 'id'>): Observable<VehicleAnormalityDetail> {
  // Evita crear duplicados exactos
  const exists = this.details.some(d =>
    d.idAnormality === detail.idAnormality &&
    d.serialNumber === detail.serialNumber
  );

  if (exists) {
    return of(null as any); // o simplemente ignóralo
  }

  const newId = this.details.length > 0 ? Math.max(...this.details.map(d => d.id)) + 1 : 1;
  const newDetail: VehicleAnormalityDetail = { id: newId, ...detail };
  this.details.push(newDetail);
  return of(newDetail).pipe(delay(300));
}



  update(id: number, updated: VehicleAnormalityDetail): Observable<void> {
    const index = this.details.findIndex(d => d.id === id);
    if (index !== -1) this.details[index] = updated;
    return of(undefined).pipe(delay(300));
  }

  delete(id: number): Observable<void> {
    this.details = this.details.filter(d => d.id !== id);
    return of(undefined).pipe(delay(300));
  }
}
