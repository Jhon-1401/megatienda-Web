import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../../core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  orderConfirmed: boolean = false;
  cartItems: any[] = [];
  subtotal = 0;

  customer = {
    name: '',
    phone: '',
    address: '',
    city: ''
  };

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    this.cartItems = this.cartService.getItems();
    this.subtotal = this.cartService.getSubtotal();
  }

  confirmOrder() {

  if (this.orderConfirmed) return;

  this.orderConfirmed = true;

  const order = {
    customer: this.customer,
    items: this.cartItems,
    total: this.subtotal,
    paymentMethod: 'Contra entrega',
    date: new Date()
  };

  localStorage.setItem('lastOrder', JSON.stringify(order));

  this.cartService.clearCart();
}

}
