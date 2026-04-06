import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor() {
    this.loadCart();
  }

  // CARGAR CARRITO DESDE el STORAGE

  private loadCart() {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.updateCartCount();
    }
  }

  // AGREGAR PRODUCTO
  addToCart(product: any) {
    const existingProduct = this.cartItems.find(
      (item) => item.id === product.id,
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.cartItems.push({
        ...product,
        quantity: 1,
      });
    }

    this.cartCount.next(this.getTotalItems());
    this.saveCart();
  }

  // OBTENER ITEMS
  getItems() {
    return this.cartItems;
  }

  // AUMENTAR CANTIDAD
  increaseQuantity(product: any) {
    product.quantity++;
    this.saveCart();
  }

  // DISMINUIR CANTIDAD
  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    } else {
      this.removeItem(product.id);
    }

    this.saveCart();
  }

  // ELIMINAR PRODUCTO
  removeItem(productId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);

    this.saveCart();
  }

  // SUBTOTAL
  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  // TOTAL ITEMS (contador navbar)
  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }

  // LIMPIAR CARRITO
  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  // GUARDAR EN STORAGE
  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.updateCartCount();
  }

  // ACTUALIZAR CONTADOR
  private updateCartCount() {
    const totalItems = this.getTotalItems();
    this.cartCount.next(totalItems);
  }
}
