import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductRepository {

  private dataUrl = 'assets/data/products.json';

  constructor(private http: HttpClient) {}

  /**
   * Se obtienen todos los productos desde el JSON.
   * Queda abierto para conectar a API o a DB
   */
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.dataUrl);
  }
}