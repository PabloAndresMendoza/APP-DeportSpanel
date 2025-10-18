import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductsInterface, ProductsInterfaceAPI } from '../interface/product.interface';
import { DataApiService } from '../services/data-api';

@Component({
  selector: 'app-user',
  imports: [CommonModule,RouterModule, FormsModule],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User implements OnInit {

  products:any = {
    idProductos: '',
    nombreProductos: '',
    descripcionProductos: '',
    cantidadProductos: '',
    fechaProductos: ''
  }

  productos: ProductsInterfaceAPI[] = [];
  idBusqueda: number | null = null;
  selectedProduct: any = null;
  private modal: any;

  constructor(private dataService: DataApiService) {}

  ngOnInit(): void {
    this.mostrarTodos();
  }

  mostrarTodos(): void {
    this.dataService.loadProducts();
    this.dataService.getProducts().subscribe({
      next: (data) => (this.productos = data),
      error: (err) => console.error('Error mostrando todos:', err)
    });
  }

  buscarPorId(): void {
    if (!this.idBusqueda || isNaN(this.idBusqueda)) {
      alert('Ingrese un ID válido');
      return;
    }

    this.dataService.getProductById1(this.idBusqueda).subscribe({
      next: (res) => {
        console.log('Respuesta API:', res);

        if (res && res.idProductos) {
          this.productos = [res];
        } else {
          alert(`No se encontró producto con ID ${this.idBusqueda}`);
        }
      },
      error: (err) => {
        console.error('Error buscando producto:', err);
        alert('Error al buscar el producto.');
      }
    });
  }

  eliminarProducto(idProductos: number): void {
    if (!confirm(`¿Seguro que deseas eliminar el producto con ID ${idProductos}?`)) return;

    this.dataService.deleteProduct(idProductos).subscribe({
      next: () => {
        alert(` Producto con ID ${idProductos} eliminado correctamente.`);
        
         this.mostrarTodos();
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        alert('Error al eliminar el producto.');
      }
    });
  }

   onSubmit(form: NgForm) {
    this.dataService.addProduct(this.products).subscribe({
      next: (res) => {
        alert('Producto insertado correctamente');
        this.productos.push({ ...this.products });

        this.dataService.loadProducts();
        form.resetForm();
      },
      error: (err) => console.error('Error al insertar producto:', err)
    });
  }

  openModal(idProductos: number) {
    this.dataService.getProductById1(idProductos).subscribe({
      next: (res) => {
        console.log('Respuesta del API:', res);

        if (res && res.idProductos) {
          this.selectedProduct = res;

          setTimeout(() => {
            const modalEl = document.getElementById('productModal');
            if (modalEl) {
              this.modal = new (window as any).bootstrap.Modal(modalEl);
              this.modal.show();
            } else {
              console.error('No se encontró el elemento del modal');
            }
          }, 100);
        } else {
          alert('No se encontró el producto con ese ID.');
        }
      },
      error: (err) => {
        console.error('Error al obtener producto:', err);
        alert('Error al cargar el producto.');
      },
    });
  }

  updateSelectedProduct() {
    if (!this.selectedProduct) return;

    const id = this.selectedProduct.idProductos;
    this.dataService.updateProduct(id, this.selectedProduct).subscribe({
      next: () => {
        alert('Producto actualizado correctamente');
        this.modal.hide();
        this.dataService.loadProducts();
      },
      error: (err) => console.error('Error al actualizar producto:', err)
    });
  }
}