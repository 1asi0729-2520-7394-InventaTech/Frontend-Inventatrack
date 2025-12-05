import { InventoryMonth } from '../domain/model/inventory-month.entity';
import { InventoryMonthResource, ProductResource } from './inventory.response';
import { Product } from '../domain/model/product.entity';

export class InventoryAssembler {
  static toProductEntity(resource: ProductResource): Product {
    return new Product({
      id: resource.id,
      categoryId: resource.categoryId,
      name: resource.name,
      quantity: resource.quantity,
      expirationDate: new Date(resource.expirationDate)
    });
  }
  static toInventoryMonthEntity(resource: InventoryMonthResource): InventoryMonth {
    return new InventoryMonth({
      id: resource.id,
      month: resource.month,
      products: resource.products.map(p => InventoryAssembler.toProductEntity(p))
    });
  }

  static toEntitiesFromResponse(resources: InventoryMonthResource[]): InventoryMonth[] {
    return resources.map(resource => InventoryAssembler.toInventoryMonthEntity(resource));
  }
}

