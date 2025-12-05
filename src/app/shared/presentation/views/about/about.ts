import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  quantity: number;
  expirationDate: string;
}

export interface InventoryMonth {
  id?: number;
  month: string;
  products: Product[];
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  selectedMonthInput: string = '';
  message = '';
  messageType: 'success' | 'error' | '' = '';

  //private apiUrl = 'https://inventatrack-azekbja3h9eyb0fy.canadacentral-01.azurewebsites.net/api/inventories';
  private apiUrl = 'http://localhost:3000/inventories';

  constructor(private http: HttpClient) {}

  addProduct() {

    if (this.selectedMonthInput) {
      const [year, month] = this.selectedMonthInput.split('-');
      const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];
      const monthName = monthNames[parseInt(month, 10) - 1];
      this.inventory.month = `${monthName} - ${year}`;
    }

    const newProduct = this.inventory.products[0];

    if (!this.inventory.month || newProduct.id <= 0 || !newProduct.name || !newProduct.expirationDate) {
      this.showMessage('⚠️ Completa todos los campos correctamente.', 'error');
      return;
    }
    const searchUrl = `${this.apiUrl}?month=${this.inventory.month}`;

    this.http.get<InventoryMonth[]>(`${this.apiUrl}?month=${this.inventory.month}`)
      .subscribe({
        next: (existingMonths) => {
          if (existingMonths.length > 0) {
            // CASO A: El mes EXISTE -> Actualizamos (PUT)
            const existingRecord = existingMonths[0];
            existingRecord.products.push(newProduct);

            this.http.put(`${this.apiUrl}/${existingRecord.id}`, existingRecord).subscribe({
              next: () => this.handleSuccess(`Producto agregado a ${this.inventory.month}`),
              error: () => this.showMessage('❌ Error al actualizar el mes.', 'error')
            });

          } else {
            // CASO B: El mes NO EXISTE -> Creamos uno nuevo (POST)
            this.http.post(this.apiUrl, this.inventory).subscribe({
              next: () => this.handleSuccess(`Nuevo registro creado para ${this.inventory.month}`),
              error: () => this.showMessage('❌ Error al crear el mes.', 'error')
            });
          }
        },
        error: (err) => {
          console.error(err);
          this.showMessage('❌ Error de conexión con el servidor local.', 'error');
        }
      });
  }

  private handleSuccess(msg: string) {
    this.showMessage(`✅ ${msg}`, 'success');
    this.resetForm();
  }

  private showMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.messageType = type;
  }

  private resetForm() {
    this.inventory.products = [{
      id: 0,
      categoryId: 0,
      name: '',
      quantity: 0,
      expirationDate: ''
    }];
  }
}

