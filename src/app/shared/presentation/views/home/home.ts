import { TranslateModule } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
//import { InventoryMonth, Product } from '../../../../inventory/product.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
  imports: [TranslateModule],
})
export class Home /**implements OnInit**/ {

  /**totalProducts: number = 0;
  productsExpiring: number = 0;
  lowStockProducts: number = 0;

  private readonly lowStockThreshold = 5;
  private readonly apiUrl = 'https://inventatrack-azekbja3h9eyb0fy.canadacentral-01.azurewebsites.net/api/inventories';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData(): void {
    this.http.get<InventoryMonth[]>(this.apiUrl).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const currentMonthInventory = data[0];
          this.calculateMetrics(currentMonthInventory.products);
        }
      },
      error: (err) => {
        console.error('Error al cargar datos del home:', err);
      }
    });
  }

  calculateMetrics(products: Product[]): void {
    //Total de productos
    this.totalProducts = products.length;

    // Productos por vencer
    const today = new Date();
    this.productsExpiring = products.filter(p => {
      const expiration = new Date(p.expirationDate);
      const diffDays = (expiration.getTime() - today.getTime()) / (1000 * 3600 * 24);
      return diffDays <= 7 && diffDays > 0;
    }).length;

    // Umbral
    this.lowStockProducts = products.filter(p => p.quantity < this.lowStockThreshold).length;
  }**/
}
