import { Order } from '../models/order.model';
import { Product } from '../models/product.model';

export class OrderFactory {
  /**
   * Crea una nueva orden con fecha automática
   */
  static create(userId: string, products: Product[], total: number): Order {
    return {
      id: Date.now().toString(),
      userId: userId,
      products: products,
      total: total,
      date: new Date(),
      status: 'pendiente',
    };
  }
}
