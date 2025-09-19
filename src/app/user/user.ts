import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';

interface Product {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

@Component({
  selector: 'app-user',
  imports: [CommonModule, DataTablesModule,RouterModule],
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
      { id: 1, nombre: 'Laptop', precio: 2500, stock: 8 },
      { id: 2, nombre: 'Mouse', precio: 30, stock: 50 },
      { id: 3, nombre: 'Teclado', precio: 70, stock: 25 },
      { id: 4, nombre: 'Monitor', precio: 500, stock: 15 },
      { id: 5, nombre: 'Impresora', precio: 200, stock: 10 },
      { id: 6, nombre: 'Tablet', precio: 300, stock: 12 },
      { id: 7, nombre: 'Celular', precio: 900, stock: 30 },
      { id: 8, nombre: 'Disco SSD', precio: 120, stock: 40 }
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
