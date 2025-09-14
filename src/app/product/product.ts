import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Settings } from 'http2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product',
  imports: [CommonModule, DataTablesModule,RouterModule],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product implements OnInit, OnDestroy {

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  products = [
    { id: 1, nombre: 'Pantaloneta', descripcion: 'Pantaloneta para nadar', cantidad: 1, precio: 12000 },
    { id: 2, nombre: 'Camiseta', descripcion: 'Camiseta para nadar', cantidad: 3, precio: 52000 },
    { id: 3, nombre: 'Medias', descripcion: 'Medias para nadar', cantidad: 6, precio: 10000 },
  ];

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: { url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json' }
    };

    // Si tus datos vinieran de una API, aquí harías la petición
    // y al final llamarías a this.dtTrigger.next();
    this.dtTrigger.next(null);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}