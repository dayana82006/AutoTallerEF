import { Injectable } from '@angular/core';
import { VehicleAnormality } from '../models/vehicle-anormality';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MockAnormalityService {
  private anormalities: VehicleAnormality[] = [
    { id: 1, name: 'Fuga de aceite', entryDate: '2024-06-01' },
    { id: 2, name: 'Ruido en frenos', entryDate: '2024-06-02' }
  ];

  getAll(): Observable<VehicleAnormality[]> {
    return of(this.anormalities).pipe(delay(300));
  }

  create(anormality: Omit<VehicleAnormality, 'id'>): Observable<VehicleAnormality> {
    const newId = this.anormalities.length > 0
      ? Math.max(...this.anormalities.map(a => a.id)) + 1
      : 1;
    const newAnormality: VehicleAnormality = { id: newId, ...anormality };
    this.anormalities.push(newAnormality);
    return of(newAnormality).pipe(delay(300));
  }

  update(id: number, updated: VehicleAnormality): Observable<VehicleAnormality | undefined> {
    const index = this.anormalities.findIndex(a => a.id === id);
    if (index !== -1) {
      this.anormalities[index] = { ...updated };
      return of(this.anormalities[index]).pipe(delay(300));
    }
    return of(undefined).pipe(delay(300));
  }

  delete(id: number): Observable<boolean> {
    const index = this.anormalities.findIndex(a => a.id === id);
    if (index !== -1) {
      this.anormalities.splice(index, 1);
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }
}
