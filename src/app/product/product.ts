import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Settings } from 'http2';
import { Subject } from 'rxjs';
import { DataService } from '../services/data';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductsInterface } from '../interface/product.interface';

@Component({
  selector: 'app-product',
  imports: [CommonModule,RouterModule, FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product implements OnInit {
  
  product = {
    id: '',
    nombre: '',
    descripcion: '',
    cantidad: '',
    precio: ''
  }

  productList: ProductsInterface[] = [];
    selectedProduct: any = null;
private modal: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Siempre cargamos los productos al iniciar el componente
    this.dataService.loadProducts();

    // Nos suscribimos al observable para actualizar la lista cuando lleguen los datos
    this.dataService.getProducts().subscribe(data => {
      this.productList = data;
    });
  }

  onSubmit(form: NgForm) {
    this.dataService.addProduct(this.product).subscribe({
      next: (res) => {
        alert('✅ Producto insertado');

        if (Array.isArray(res) && res.length > 0) {
          this.productList.push(res[0]);
        }

        this.product = { id: '', nombre: '', descripcion: '', cantidad: '', precio: '' };
        form.resetForm({
          id: 0,
          nombre: '',
          descripcion: '',
          cantidad: 0,
          precio: 0
        });
      },
      error: (err) => console.error('❌ Error al insertar', err)
    });
  }

  deleteProduct(id: number) {
    if (confirm(`¿Seguro que deseas eliminar el producto con ID ${id}?`)) {
      this.dataService.deleteProduct(id).subscribe({
        next: () => {
          console.log(`✅ Producto ${id} eliminado`);
          alert('Producto eliminado');

          this.productList = this.productList.filter(p => p.id !== id);

        },
        error: (err) => {
          console.error('Error al eliminar:', err);
        }
      });
    }
  }

  id: number | null = null;

  searchProduct(form: NgForm) {
    const raw = (form.value.id ?? '').toString().trim();
    if (!raw) {
      this.dataService.loadProducts();
      return;
    }

    const id = Number(raw);
    if (Number.isNaN(id)) {
      alert('Ingrese un ID numérico válido');
      return;
    }

    this.dataService.getProductById(id).subscribe({
      next: (res: any[]) => {
        this.productList = Array.isArray(res) ? res : (res ? [res] : []);
        if (this.productList.length === 0) {
          alert(`No se encontró producto con ID ${id}`);
        }
      },
      error: (err) => console.error('Error buscando por ID:', err)
    });
  }

openModal(id: number) {
  console.log('🟡 Abriendo modal para ID:', id);

  this.dataService.getProductById(id).subscribe({
    next: (res) => {
      if (res && res.length > 0) {
        this.selectedProduct = res[0];
        console.log('🟢 Datos del producto:', this.selectedProduct);

        // Esperar a que Angular actualice la vista
        setTimeout(() => {
          const modalEl = document.getElementById('productModal');
          if (modalEl) {
            this.modal = new (window as any).bootstrap.Modal(modalEl);
            this.modal.show();
          } else {
            console.error('❌ No se encontró el elemento del modal');
          }
        }, 100);
      } else {
        alert('No se encontró el producto con ese ID.');
      }
    },
    error: (err) => {
      console.error('Error al obtener producto:', err);
    },
  });
}

  updateSelectedProduct() {
    if (!this.selectedProduct) return;

    this.dataService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe({
      next: () => {
        alert('✅ Producto actualizado');
        this.modal.hide();       // cerrar modal
      //  this.dataService.loadProducts();     // refrescar tabla
      },
      error: (err) => console.error('❌ Error al actualizar producto', err)
    });
  }

  
}