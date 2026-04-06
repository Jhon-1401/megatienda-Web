import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CommonModule, CardModule, RatingModule, ButtonModule, FormsModule],
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent {
  @Input() product: any;

  constructor(private cartService: CartService) {}

  addToCart(productId: number) {
    this.cartService.addToCart(productId, 1).subscribe({
      next: () => {
        this.cartService.updateCartCount(this.cartService.cartCount.value + 1);
      },

      error: () => {
        this.cartService.updateCartCount(this.cartService.cartCount.value + 1);
      },
    });
  }
}
