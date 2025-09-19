import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Settings } from 'http2';
import { Subject } from 'rxjs';
import { DataService } from '../services/data';

@Component({
  selector: 'app-product',
  imports: [CommonModule, DataTablesModule,RouterModule],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product implements OnInit {
  productList: any[] = [];

  constructor(private productService: DataService) {}

  ngOnInit(): void {
    // Siempre cargamos los productos al iniciar el componente
    this.productService.loadProducts();

    // Nos suscribimos al observable para actualizar la lista cuando lleguen los datos
    this.productService.getProducts().subscribe(data => {
      this.productList = data;
    });
  }
}