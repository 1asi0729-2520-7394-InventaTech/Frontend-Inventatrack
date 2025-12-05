import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  quantity: number;
  expirationDate: string;
}

export interface InventoryMonth {
  month: string;
  products: Product[];
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About {
  inventory: InventoryMonth = {
    month: '',
    products: [
      {
        id: 0,
        categoryId: 0,
        name: '',
        quantity: 0,
        expirationDate: ''
      }
    ]
  };

  message = '';
  messageType: 'success' | 'error' | '' = '';

  private apiUrl = 'https://inventatrack-azekbja3h9eyb0fy.canadacentral-01.azurewebsites.net/api/inventories';

  constructor(private http: HttpClient, private translate: TranslateService) {}

  addProduct() {
    const p = this.inventory.products[0];

    if (!this.inventory.month || p.id <= 0 || p.categoryId <= 0 || !p.name || p.quantity <= 0 || !p.expirationDate) {
      this.message = this.translate.instant('add_product.msg.complete_fields');
      this.messageType = 'error';
      return;
    }

    this.http.post(this.apiUrl, this.inventory).subscribe({
      next: () => {
        this.message = this.translate.instant('add_product.msg.success');
        this.messageType = 'success';
        this.inventory = {
          month: '',
          products: [
            { id: 0, categoryId: 0, name: '', quantity: 0, expirationDate: '' }
          ]
        };
      },
      error: (err) => {
        console.error('Error al registrar inventario:', err);
        this.message = this.translate.instant('add_product.msg.error');
        this.messageType = 'error';
      }
    });
  }
}

