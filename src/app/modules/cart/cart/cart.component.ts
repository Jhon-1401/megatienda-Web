import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  subtotal: number = 0;

  constructor(
    private cartService: CartService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe((cart) => {
      this.cartItems = cart;

      const totalItems = cart.reduce(
        (sum: any, item: any) => sum + item.quantity,
        0,
      );

      this.cartService.cartCount.next(totalItems);

      this.subtotal = cart.reduce(
        (sum: any, item: any) => sum + item.price * item.quantity,
        0,
      );
    });
  }


  calculateSubtotal(){

  this.subtotal = this.cartItems.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  const totalItems = this.cartItems.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  this.cartService.updateCartCount(totalItems);

}


  increase(item: any) {
    item.quantity++; // actualizar UI
    this.calculateSubtotal();

    this.cartService.addToCart(item.productId, 1).subscribe();
  }



decrease(item: any) {

  if (item.quantity > 1) {

    item.quantity--; // actualizar UI
    this.calculateSubtotal();

    this.cartService.addToCart(item.productId, -1).subscribe();

  } else {

    this.cartItems = this.cartItems.filter(
      i => i.productId !== item.productId
    );

    this.calculateSubtotal();

    this.cartService.removeFromCart(item.productId).subscribe();

  }

}



remove(productId: number) {

  // eliminar del array local (refresca UI)
  this.cartItems = this.cartItems.filter(
    item => item.productId !== productId
  );

  this.calculateSubtotal();

  // llamar backend
  this.cartService.removeFromCart(productId).subscribe();

}


trackByProduct(index: number, item: any) {
    return item.productId;
}

}