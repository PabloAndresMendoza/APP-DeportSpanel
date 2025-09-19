import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Settings } from 'http2';
import { Subject } from 'rxjs';
import { DataService } from '../services/data';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [CommonModule, DataTablesModule,RouterModule, FormsModule],
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

  productList: any[] = [];

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

  searchId: string = "";   // referencia al input

  onSearch(): void {
    console.log("🔍 Buscando con ID:", this.searchId);

    if (!this.searchId) {
      this.dataService.loadProducts();
      return;
    }

    const id = Number(this.searchId);

    this.dataService.getProductById(id).subscribe({
      next: (res) => {
        this.productList = Array.isArray(res) ? res : [res];
        if (this.productList.length === 0) {
          alert(`⚠️ No se encontró el producto con ID ${id}`);
        }
      },
      error: (err) => console.error("❌ Error al buscar:", err)
    });
  }
}