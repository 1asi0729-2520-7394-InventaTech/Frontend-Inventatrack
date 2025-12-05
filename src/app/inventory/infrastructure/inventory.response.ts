export interface ProductResource {
  id: number;
  categoryId: number;
  name: string;
  quantity: number;
  expirationDate: string;
}

export interface InventoryMonthResource {
  id: number;
  month: string;
  products: ProductResource[];
}
