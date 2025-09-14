import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user',
  imports: [CommonModule, DataTablesModule,RouterModule],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User implements OnInit, OnDestroy {

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  usuarios = [
    { id: 1, nombre: 'Ana', correo: 'ana@example.com' },
    { id: 2, nombre: 'Luis', correo: 'luis@example.com' },
    { id: 3, nombre: 'Carla', correo: 'carla@example.com' }
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
} {

}
