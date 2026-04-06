import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppSettings } from '../../proyect.config';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private apiUrl = AppSettings.rutServCart;

  cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}/enable`);
  }

  updateCartCount(count:number){
    this.cartCount.next(count);
  }

  addToCart(productId:number, quantity:number){
    return this.http.post(`${this.apiUrl}/add`,{
      productId,
      quantity
    });
  }

  removeFromCart(productId:number){
    return this.http.delete(`${this.apiUrl}/remove/${productId}`);
  }

  clearCart(){
    return this.http.delete(`${this.apiUrl}/clear`);
  }

}
