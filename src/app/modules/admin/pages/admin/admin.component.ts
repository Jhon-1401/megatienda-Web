import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductServiceService} from '../../../../services/product-service.service';
import {ProductService} from '../../../../core/services/product.service';
import {Product} from '../../../../models/product.model';
import {Button, ButtonModule} from 'primeng/button';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {ProductViewComponent} from '../../../products/product-view/product-view.component';
import {Select} from 'primeng/select';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputNumber} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {FileUpload} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {Toast, ToastModule} from 'primeng/toast';
import {ConfirmDialog, ConfirmDialogModule} from 'primeng/confirmdialog';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  imports: [
    Button,
    NgForOf,
    ProductViewComponent,
    Select,
    InputNumber,
    DropdownModule,
    ReactiveFormsModule,
    NgIf,
    FileUpload,
    TableModule,
    CurrencyPipe,
    ToastModule,
    ConfirmDialog,
    ConfirmDialogModule, ButtonModule
  ],
  providers: [MessageService,ConfirmationService],
  styleUrls: ['./admin-component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {
  productForm!: FormGroup;
  product: Product | null = null;
  listProducts: Product[] = [];
  loading = false;
  columnas: any =null;
  loadingTable = false;

  @Output() save = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  categories: SelectItem[] = [
    { label: 'Tecnología', value: 'Tecnología' },
    { label: 'Ropa', value: 'Ropa' },
    { label: 'Calzado', value: 'Calzado' },
    { label: 'Audio', value: 'Audio' },
    { label: 'Video', value: 'Video' }
  ];
  constructor(
    private _productService: ProductServiceService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit() {
    this.loading = true;
    this.columnas = [
      { field: 'name', header: 'NOMBRE' , sort: true },
      { field: 'description',header: 'DESCRIPCION', sort: true },
      { field: 'price',header: 'PRECIO', sort: true },
      { field: 'category',header: 'CATEGORIA', sort: true },
      { field: 'action',header: 'ACCIONES', sort: true },
    ];
    this.loadProducts();
    this.loadForm();
  }
  ngAfterViewInit() {
    this.loading = false;
  }

  loadForm(){
    this.productForm = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      category: [null, Validators.required],
      brand: [null, Validators.required],
      stock: [null, [Validators.required, Validators.min(0)]],
      imageUrl: [null],
    });

    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  loadProducts() {
    this._productService.getProducts().subscribe(data => {
      this.listProducts = data;
    });
  }

  onImageSelect(event: any) {
    const file = event.files[0];
    if (file) {
      // Si quieres guardar la URL temporal
      const reader = new FileReader();
      reader.onload = () => {
        this.productForm.patchValue({ imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    if (this.productForm.valid) {
      // lógica de guardado...
      this.messageService.add({
        severity: 'success',
        summary: 'Guardado',
        detail: 'El producto se guardó correctamente',
        icon: 'pi pi-check'
      });
      if (!this.productForm.value.id){
        await firstValueFrom(this._productService.addProduct(this.productForm.value));

      }else {
        await firstValueFrom(this._productService.updateProduct(this.productForm.value));
      }
      await this.clearForm();
    }


    this.save.emit(this.productForm.value);
  }
  confirmDisable(item: Product) {
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea inhabilitar este producto?',
      header: 'Advertencia',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, inhabilitar',
      rejectLabel: 'Cancelar',
      accept: async () => {
        await this.disable(item);
      }
    });
  }

  async disable(item:Product) {
    this.listProducts = this.listProducts.filter(product => product.id !== item.id);
    await firstValueFrom(this._productService.deleteProduct(item))
    this.messageService.add({
      severity: 'warn',
      summary: 'Inhabilitado',
      detail: 'El producto se eliminó correctamente',
      icon: 'pi pi-check'
    });
    this.cancel.emit();
  }
  edit(item: Product) {
    if (!item) return;
    this.productForm.patchValue({
      id: item.id,
      name: item.name,
      brand: item.brand,
      description: item.description,
      price: item.price,
      stock: item.stock,
      rating: item.rating,
      category: item.category,   // asegúrate que coincida con el valor esperado por p-select
      imageUrl: null    // si usas p-fileUpload, aquí puedes manejar base64 o URL
    });

  }
  onCancel(){
    this.clearForm();
  }
  async clearForm() {
   await this.productForm.reset();
  }

}
