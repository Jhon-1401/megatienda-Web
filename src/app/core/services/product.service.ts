import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductRepository } from '../../repositories/product.repository';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private productRepository: ProductRepository) {}

  /**
   * Retorna todos los productos
   */
  getAll(): Observable<Product[]> {
    return this.productRepository.getAll();
  }

  /**
   * Filtra por categoría
   */
  getByCategory(category: string): Observable<Product[]> {
    return this.productRepository.getAll().pipe(
      map(products =>
        products.filter(p =>
          p?.category?.toLowerCase() === category.toLowerCase()
        )
      )
    );
  }

  /**
   * Filtra por rango de precio
   */
  /*filterByPrice(min: number, max: number): Observable<Product[]> {
    // @ts-ignore
    return this.productRepository.getAll().pipe(
      map(products =>
        products.filter(p =>
          p.price >= min && p.price <= max
        )
      )
    );
  }*/

  /**
   * Filtra por marca
   */
  filterByBrand(brand: string): Observable<Product[]> {
    return this.productRepository.getAll().pipe(
      map(products =>
        products.filter(p =>
          p?.brand?.toLowerCase() === brand.toLowerCase()
        )
      )
    );
  }
}
