import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Product} from '../models/product.model';
import {AppSettings} from '../../proyect.config';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  products : Product[]=[]
  private rutServProducts: string = AppSettings.rutServProducts;

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    return  this.http.get(`${this.rutServProducts}/all`).pipe(map(response => response as Product[]) );
    //return this.http.get<Product[]>('assets/data/listProducts.json');
  }

  // Filtrar productos en memoria
  filtrarProducts(products: Product[], filtro: { category?: string | null; minPrice?: number | null; maxPrice?: number | null }): Product[] {
    return products.filter(product => {
      const cumpleCategoria = filtro.category ? product.category === filtro.category : true;
      const cumpleMinPrice = filtro.minPrice != null ? product.price! >= filtro.minPrice : true;
      const cumpleMaxPrice = filtro.maxPrice != null ? product.price! <= filtro.maxPrice : true;
      return cumpleCategoria && cumpleMinPrice && cumpleMaxPrice;
    });
  }

  filterName(products: Product[], filter: string) {
    const normalize = (text: string) =>
      text
        .normalize("NFD") // descompone caracteres con tilde
        .replace(/[\u0300-\u036f]/g, "") // elimina los diacríticos
        .toLowerCase();

    const coincidencias = products.filter(product =>
      normalize(product?.name ?? "").includes(normalize(filter))
    );

    return coincidencias;
  }

  deleteProduct(product: Product) {
    return  this.http.delete(`${this.rutServProducts}/${product.id}`).pipe(map(response => response as any) );
  }

  addProduct(product: Product) {
    return this.http.post(`${this.rutServProducts}/add`, product, {
      responseType: 'text'
    }).pipe(
      map(response => {
        // Aquí 'response' será simplemente el string "Producto agregado"
        return { message: response };
      })
    );
  }

  updateProduct(product: Product) {
    return this.http.put(`${this.rutServProducts}/${product.id}`, product, {
      responseType: 'text'
    }).pipe(
      map(response => {
        // Aquí 'response' será simplemente el string "Producto agregado"
        return { message: response };
      })
    );
  }



}
