import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceOrder } from '../models/service-order';

@Injectable({
  providedIn: 'root'
})
export class MockServiceOrderService {
  private readonly API_URL = 'http://localhost:5005/api/ServiceOrder'; 

  constructor(private http: HttpClient) {}

  getServiceOrders(): Observable<ServiceOrder[]> {
    return this.http.get<ServiceOrder[]>(this.API_URL);
  }

  getServiceOrderById(id: number): Observable<ServiceOrder> {
    return this.http.get<ServiceOrder>(`${this.API_URL}/${id}`);
  }

  createServiceOrder(order: Omit<ServiceOrder, 'id' | 'createdAt' | 'updatedAt'>): Observable<ServiceOrder> {
    return this.http.post<ServiceOrder>(this.API_URL, order);
  }

  updateServiceOrder(id: number, updatedOrder: ServiceOrder): Observable<ServiceOrder> {
    return this.http.put<ServiceOrder>(`${this.API_URL}/${id}`, updatedOrder);
  }

  deleteServiceOrder(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.API_URL}/${id}`);
  }

  linkInvoice(orderId: number, invoiceId: number): Observable<void> {
    return this.http.post<void>(
      'http://localhost:5005/api/invoicedetail', 
      { serviceOrderId: orderId, invoiceId }
    );
  }

  createInvoiceForOrder(orderId: number): Observable<any> {
    return this.http.post<any>(
      'http://localhost:5005/api/invoice', 
      { serviceOrderId: orderId }
    );
  }
}
