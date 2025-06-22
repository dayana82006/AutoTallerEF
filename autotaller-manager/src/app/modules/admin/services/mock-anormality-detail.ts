import { Injectable } from '@angular/core';
import { VehicleAnormalityDetail } from '../models/vehicle-anormality-detail';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MockAnormalityDetailService {
  private details: VehicleAnormalityDetail[] = [
    {
      id: 1,
      idAnormality: 1,
      serialNumber: 'ABC123XYZ',
      createdAt: new Date(),
      updatedAt: undefined  
    },
    {
      id: 2,
      idAnormality: 2,
      serialNumber: 'DEF456LMN',
      createdAt: new Date(),
      updatedAt: undefined  
    }
  ];

  getAll(): Observable<VehicleAnormalityDetail[]> {
    return of(this.details).pipe(delay(300));
  }

  create(
    detail: Omit<VehicleAnormalityDetail, 'id' | 'createdAt' | 'updatedAt'>
  ): Observable<VehicleAnormalityDetail> {
    const exists = this.details.some(
      (d) =>
        d.idAnormality === detail.idAnormality &&
        d.serialNumber === detail.serialNumber
    );

    if (exists) {
      return of(null as any); 
    }

    const newId =
      this.details.length > 0
        ? Math.max(...this.details.map((d) => d.id)) + 1
        : 1;

    const newDetail: VehicleAnormalityDetail = {
      id: newId,
      ...detail,
      createdAt: new Date(),
      updatedAt: undefined  
    };

    this.details.push(newDetail);
    return of(newDetail).pipe(delay(300));
  }

  update(id: number, updated: VehicleAnormalityDetail): Observable<void> {
    const index = this.details.findIndex(d => d.id === id);
    if (index === -1) return of(undefined).pipe(delay(300));
    const orig = this.details[index];

    this.details[index] = {
      id: orig.id,
      idAnormality: updated.idAnormality,
      serialNumber: updated.serialNumber,
      createdAt: orig.createdAt,
      updatedAt: new Date()
    };

    return of(undefined).pipe(delay(300));
  }



  delete(id: number): Observable<void> {
    this.details = this.details.filter((d) => d.id !== id);
    return of(undefined).pipe(delay(300));
  }
}
