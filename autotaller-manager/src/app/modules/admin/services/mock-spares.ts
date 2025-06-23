import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Spare } from '../models/spare';

@Injectable({
  providedIn: 'root',
})
export class MockSpareService {
  private spares: Spare[] = [
    {
      id: 1,
      code: 'SP001',
      description: 'Filtro de aire',
      stockQuantity: 10,
      unitPrice: 50000,
      createdAt: new Date(),
    },
    {
      id: 2,
      code: 'SP002',
      description: 'Aceite 20W50',
      stockQuantity: 20,
      unitPrice: 35000,
      createdAt: new Date(),
    },
  ];

  getAll(): Observable<Spare[]> {
    return of(this.spares).pipe(delay(300));
  }

  create(spare: Omit<Spare, 'id' | 'createdAt' | 'updatedAt'>): Observable<Spare> {
    const id = Math.max(...this.spares.map(s => s.id), 0) + 1;
    const newSpare: Spare = {
      id,
      ...spare,
      createdAt: new Date(),
      updatedAt: undefined
    };
    this.spares.push(newSpare);
    return of(newSpare).pipe(delay(300));
  }

  update(id: number, spare: Spare): Observable<Spare> {
    const index = this.spares.findIndex(s => s.id === id);
    if (index !== -1) {
      const existing = this.spares[index];
      this.spares[index] = {
        ...spare,
        id,
        createdAt: existing.createdAt,
        updatedAt: new Date()
      };
    }
    return of(this.spares[index]).pipe(delay(300));
  }

  delete(id: number): Observable<boolean> {
    this.spares = this.spares.filter(s => s.id !== id);
    return of(true).pipe(delay(300));
  }
}
