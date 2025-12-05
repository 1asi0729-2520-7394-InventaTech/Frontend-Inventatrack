import { inject, Injectable, signal, computed } from '@angular/core';
import { InventoryApi } from '../infrastructure/inventory.api';
import { InventoryMonth } from '../domain/model/inventory-month.entity';

@Injectable({
  providedIn: 'root'
})
export class InventoryStore {
  private api = inject(InventoryApi);

  private inventorySignal = signal<InventoryMonth[]>([]);
  private selectedMonthSignal = signal<string>('');
  private searchTermSignal = signal<string>('');
  private isLoadingSignal = signal<boolean>(false);
  private errorSignal = signal<string>('');

  readonly months = computed(() => this.inventorySignal().map(i => i.month));
  readonly selectedMonth = computed(() => this.selectedMonthSignal());
  readonly isLoading = computed(() => this.isLoadingSignal());
  readonly errorMessage = computed(() => this.errorSignal());

  readonly filteredProducts = computed(() => {
    const selected = this.selectedMonthSignal();
    const term = this.searchTermSignal().toLowerCase();
    const inventory = this.inventorySignal();

    const monthData = inventory.find(i => i.month === selected);
    const products = monthData ? monthData.products : [];

    if (!term) return products;
    return products.filter(p => p.name.toLowerCase().includes(term));
  });

  loadInventory() {
    this.isLoadingSignal.set(true);
    this.api.getAll().subscribe({
      next: (data) => {
        this.inventorySignal.set(data);
        if (data.length > 0 && !this.selectedMonthSignal()) {
          this.selectedMonthSignal.set(data[0].month);
        }
        this.isLoadingSignal.set(false);
      },
      error: (err) => {
        console.error(err);
        this.errorSignal.set('Error al cargar inventario');
        this.isLoadingSignal.set(false);
      }
    });
  }

  selectMonth(month: string) {
    this.selectedMonthSignal.set(month);
  }

  setSearchTerm(term: string) {
    this.searchTermSignal.set(term);
  }
}
