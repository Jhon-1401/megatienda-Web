import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductViewComponent } from '../product-view/product-view.component';
import {Product} from '../../../models/product.model';
import {ProductServiceService} from '../../../services/product-service.service';
import {FormsModule} from '@angular/forms';
import {ProductFilter} from '../../../models/productFilter';
import {SelectItem} from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';
import {Select} from 'primeng/select';
import {Button} from 'primeng/button';
import {ComunicacionService} from '../../../services/communication-service';
import {Subject, take, takeUntil} from 'rxjs';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [
    CommonModule,
    ProductViewComponent,
    FormsModule,
    DropdownModule,
    Select,
    Button,
    // importa el otro standalone component
  ],
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {
  listProducts: Product[] = [];
  listProductsTodos: Product[] = [];
  categories: string[] = [];
  categoriesOptions: SelectItem[] = [];
  rangeMinPrice: SelectItem[] = [];
  rangeMaxPrice: SelectItem[] = [];
  selectedCategory: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  dato: string = '';
  private destroy$ = new Subject<void>();


  constructor(
    private _productServiceService : ProductServiceService,
    private comunicacionService: ComunicacionService
  ) {
    this.comunicacionService.busqueda$.subscribe(valor => {
      this.searhcName(valor);
    });

  }
  ngOnInit() {
    this._productServiceService.getProducts().subscribe(data => {
      this.listProducts = data;
      this.listProductsTodos = data;
      this.llenarListas();
    });
  }

  llenarListas() {
    this.categories = [... new Set(this.listProducts
      .filter(p => p.category)
      .map(p => p.category as string))];
    console.log(this.categories);
    this.categoriesOptions = [
      { label: 'Todas', value: '' },
      ...this.categories.map(cat => ({
        label: cat,
        value: cat
      }))
    ];
    this.rangeMinPrice = [
      {value: 10000, label: '10.000$'},
      {value: 20000, label: '20.000$'},
      {value: 50000, label: '50.000$'},
      {value: 100000, label: '100.000$'},
      {value: 200000, label: '200.000$'},
    ];
    this.rangeMaxPrice = [
      {value: 500000, label: '500.000$'},
      {value: 1000000, label: '1.000.000$'},
      {value: 2000000, label: '2.000.000$'},
      {value: 5000000, label: '5.0000.000$'},
    ];
  }

  applyFilters() {
    const filtro: ProductFilter = {
      category: this.selectedCategory,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    };

    this.listProducts = this._productServiceService.filtrarProducts(this.listProductsTodos, filtro);
  }
  clearFilters() {
    this.listProducts = this.listProductsTodos;
    this.maxPrice = null;
    this.minPrice = null;
    this.selectedCategory = '';

  }

  searhcName(dato: string) {
    if (dato.length > 3) {
      this.listProducts = this._productServiceService.filterName(this.listProductsTodos, dato);
    } else {
      this.listProducts = this.listProductsTodos;
    }
  }

}
