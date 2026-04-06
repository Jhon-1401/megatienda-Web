import { Product } from './product.model';

export interface Order {
  id: string;
  userId: string;
  products: Product[];
  total: number;
  date: Date;
  status: "pendiente" | "completado";
}