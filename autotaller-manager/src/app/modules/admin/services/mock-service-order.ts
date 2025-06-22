import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ServiceOrder } from '../models/service-order';
import { Vehicle } from '../models/vehicle';
import { ServiceType } from '../models/service-type';
import { UserMember } from '../models/user-member';

@Injectable({
  providedIn: 'root'
})
export class MockServiceOrderService {
  private serviceOrders: ServiceOrder[] = [
    {
      id: 1,
      description: 'Cambio de aceite',
      clientApproved: true,
      serialNumber: {
        id: 1,
        serialNumber: 'ABC123XYZ',
        releaseYear: 2020,
        km: 35000,
        vehicleModelId: 1,
        clientId: 1,
        fuelTypeId: 2,
        vehicleTypeId: 1
      },
      serviceType: {
        id: 1,
        description: 'Mantenimiento general'
      },
      UserMember: {
        id: 1,
        name: 'Juan',
        lastname: 'Pérez',
        email: 'juan@example.com',
        role: 'Admin',
        specialties: []
      },
      unitPrice: 120000,
      status: {
        id: 1,
        description: 'En proceso'
      }
    },
    {
      id: 2,
      description: 'Alineación y balanceo',
      clientApproved: false,
      serialNumber: {
        id: 2,
        serialNumber: 'DEF456LMN',
        releaseYear: 2019,
        km: 54000,
        vehicleModelId: 2,
        clientId: 2,
        fuelTypeId: 1,
        vehicleTypeId: 1
      },
      serviceType: {
        id: 2,
        description: 'Suspensión'
      },
      UserMember: {
        id: 2,
        name: 'Laura',
        lastname: 'Gómez',
        email: 'laura@example.com',
        role: 'Operario',
        specialties: []
      },
      unitPrice: 80000,
      status: {
        id: 2,
        description: 'Pendiente'
      }
    }
  ];

  getServiceOrders(): Observable<ServiceOrder[]> {
    return of(this.serviceOrders).pipe(delay(300));
  }

  getServiceOrderById(id: number): Observable<ServiceOrder | undefined> {
    const order = this.serviceOrders.find(o => o.id === id);
    return of(order).pipe(delay(300));
  }

  createServiceOrder(order: Omit<ServiceOrder, 'id'>): Observable<ServiceOrder> {
    const newId = this.serviceOrders.length > 0 ? Math.max(...this.serviceOrders.map(o => o.id)) + 1 : 1;
    const newOrder: ServiceOrder = { id: newId, ...order };
    this.serviceOrders.push(newOrder);
    return of(newOrder).pipe(delay(300));
  }

  updateServiceOrder(id: number, updatedOrder: ServiceOrder): Observable<ServiceOrder | undefined> {
    const index = this.serviceOrders.findIndex(o => o.id === id);
    if (index !== -1) {
      this.serviceOrders[index] = { ...updatedOrder };
      return of(this.serviceOrders[index]).pipe(delay(300));
    }
    return of(undefined).pipe(delay(300));
  }

  deleteServiceOrder(id: number): Observable<boolean> {
    const index = this.serviceOrders.findIndex(o => o.id === id);
    if (index !== -1) {
      this.serviceOrders.splice(index, 1);
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }
}
