export class Product {
  id: number;
  categoryId: number;
  name: string;
  quantity: number;
  expirationDate: Date;

  constructor(data: Partial<Product>) {
    this.id = data.id || 0;
    this.categoryId = data.categoryId || 0;
    this.name = data.name || '';
    this.quantity = data.quantity || 0;
    this.expirationDate = data.expirationDate ? new Date(data.expirationDate) : new Date();
  }

  isExpired(): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.expirationDate < today;
  }

  isNearExpiration(daysThreshold: number = 7): boolean {
    const today = new Date();
    const diffTime = this.expirationDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= daysThreshold && diffDays > 0;
  }
}

