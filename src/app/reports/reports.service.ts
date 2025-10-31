import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  quantity: number;
  expirationDate: string;
}

@Injectable({ providedIn: 'root' })
export class ReportsService {
  private baseUrl = 'https://inventatrack-azekbja3h9eyb0fy.canadacentral-01.azurewebsites.net/api/reports';

  constructor(private http: HttpClient) {}

  getLowStockProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/low-stock`);
  }

  getExpiringProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/expiring-products`);
  }

  getExpiringIn14Days(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/expiring-in-14-days`);
  }

  getExpiredProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/expired-products`);
  }
}
