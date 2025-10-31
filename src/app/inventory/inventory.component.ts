import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  quantity: number;
  expirationDate: string;
}

export interface InventoryMonth {
  id: number;
  month: string;
  products: Product[];
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe]
})
export class InventoryComponent implements OnInit {
  allData: InventoryMonth[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];
  months: string[] = [];
  selectedMonth: string = '';
  searchTerm: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  private apiUrl = 'https://inventatrack-azekbja3h9eyb0fy.canadacentral-01.azurewebsites.net/api/inventories';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchInventory();
  }

  fetchInventory(): void {
    this.isLoading = true;
    this.http.get<InventoryMonth[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.allData = data;
        this.months = data.map(entry => entry.month);

        if (this.months.length > 0) {
          this.selectedMonth = this.months[0];
          this.updateFilteredProducts();
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener inventario:', err);
        this.errorMessage = 'Error al cargar el inventario. Intenta más tarde.';
        this.isLoading = false;
      }
    });
  }

  updateFilteredProducts(): void {
    const monthData = this.allData.find(entry => entry.month === this.selectedMonth);
    if (monthData) {
      this.products = monthData.products;
      this.applyFilters();
    } else {
      this.products = [];
      this.filteredProducts = [];
    }
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  isExpired(date: string): boolean {
    const today = new Date();
    const expiration = new Date(date);
    return expiration < today;
  }

  isNearExpiration(date: string): boolean {
    const today = new Date();
    const expiration = new Date(date);
    const diffDays = (expiration.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return diffDays <= 7 && diffDays > 0;
  }
}
