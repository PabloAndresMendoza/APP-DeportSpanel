import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';

interface Product {
  id: number;
  usuario: string;
  nombre: string;
  email: string;
  ntelefonico: number;
}

@Component({
  selector: 'app-user',
  imports: [CommonModule,RouterModule],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User implements OnInit {
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  
  // Paginación
  page: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;

  // Ordenamiento
  sortColumn: keyof Product = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    // Datos quemados de prueba
    this.products = [
      { id: 1, usuario: 'pablo1', nombre: 'Pablo', email: 'h@gmail.com', ntelefonico: 3},
      { id: 2, usuario: 'pablo1', nombre: 'Anderson', email: 'h@gmail.com', ntelefonico: 3},
      { id: 3, usuario: 'pablo1', nombre: 'Andres', email: 'h@gmail.com', ntelefonico: 3 },
      { id: 4, usuario: 'pablo1', nombre: 'Daniel', email: 'h@gmail.com', ntelefonico: 3},
      { id: 5, usuario: 'pablo1', nombre: 'Jose', email: 'h@gmail.com', ntelefonico: 3 },
      { id: 6, usuario: 'pablo1', nombre: 'Maria', email: 'h@gmail.com', ntelefonico: 3 },
      { id: 7, usuario: 'pablo1', nombre: 'Cecilia', email: 'h@gmail.com', ntelefonico: 3 },
      { id: 8, usuario: 'pablo1', nombre: 'Oscar', email: 'h@gmail.com', ntelefonico: 3 }
    ];
    this.updatePagination();
  }

  // Cambiar de página
  changePage(p: number) {
    if (p >= 1 && p <= this.totalPages) {
      this.page = p;
      this.updatePagination();
    }
  }

  // Actualizar datos paginados
  updatePagination() {
    this.totalPages = Math.ceil(this.products.length / this.pageSize);
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProducts = [...this.products]
      .sort((a, b) => this.compare(a, b))
      .slice(start, end);
  }

  // Ordenar
  sort(column: keyof Product) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.updatePagination();
  }

  compare(a: Product, b: Product): number {
    const valueA = a[this.sortColumn];
    const valueB = b[this.sortColumn];
    if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
    return 0;
  }

  get totalPagesArray() {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }
}
