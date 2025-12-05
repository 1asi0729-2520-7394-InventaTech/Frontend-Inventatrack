import {Product} from './product.entity';

export class InventoryMonth {
  id: number;
  month: string;
  products: Product[];

  constructor(data: Partial<InventoryMonth>) {
    this.id = data.id || 0;
    this.month = data.month || '';
    this.products = data.products ? data.products.map(p => new Product(p)) : [];
  }
}
