import {Component, inject, OnInit} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {InventoryStore} from '../../../application/inventory.store';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class InventoryComponent implements OnInit {
  private store = inject(InventoryStore);

  months = this.store.months;
  selectedMonth = this.store.selectedMonth;
  filteredProducts = this.store.filteredProducts;
  isLoading = this.store.isLoading;
  errorMessage = this.store.errorMessage;

  searchTerm: string = '';

  ngOnInit(): void {
    this.store.loadInventory();
  }

  onMonthChange(month: string): void {
    this.store.selectMonth(month);
  }

  onSearchChange(): void {
    this.store.setSearchTerm(this.searchTerm);
  }
}

