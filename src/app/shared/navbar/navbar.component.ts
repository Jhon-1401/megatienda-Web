import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { ComunicacionService } from '../../services/communication-service';
import { count } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartCount: number = 0;
  searchText: string = '';
  constructor(
    public cartService: CartService,
    public authService: AuthService,
    private router: Router,
    private comunicacionService: ComunicacionService,
  ) {}

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
  }

  search() {
    if (this.searchText.trim()) {
      this.comunicacionService.enviarBusqueda(this.searchText);
    }
    if (!this.searchText.trim() || this.searchText.length < 3) return;
    this.comunicacionService.enviarBusqueda(this.searchText);
    this.router.navigate(['/catalogo'], {
      queryParams: { q: this.searchText },
    });

    //this.searchText = '';
    this.router.navigate(['/catalogo'], {
      queryParams: { q: this.searchText },
    });
  }

  isAdmin(): boolean {
    return this.authService.userRole === 'ADMIN';
  }
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/catalogo']);
  }
}
