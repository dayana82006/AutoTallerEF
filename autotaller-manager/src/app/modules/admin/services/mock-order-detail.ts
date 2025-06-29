import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDetail } from '../models/order-detail';

@Injectable({
  providedIn: 'root'
})
export class MockOrderDetailService {
  private readonly API_URL = 'http://localhost:5005/api/OrderDetails';

  constructor(private http: HttpClient) {}

  getAll(): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(this.API_URL);
  }

  getByOrderId(orderId: number): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(`${this.API_URL}/ByOrder/${orderId}`);
  }

  create(orderDetail: Omit<OrderDetail, 'id'>): Observable<OrderDetail> {
    return this.http.post<OrderDetail>(this.API_URL, orderDetail);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.API_URL}/${id}`);
  }
}
