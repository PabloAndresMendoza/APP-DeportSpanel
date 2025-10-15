import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from './services/data';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataApiService } from './services/data-api';


@Component({
  selector: 'app-root',
  standalone: true,          
  imports: [RouterModule, FormsModule, HttpClientModule],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.css'
})
export class App implements OnInit {

  constructor(private productService: DataService, private productServiceApi: DataApiService) {}

  ngOnInit(): void {
    this.productService.loadProducts();
    this.productServiceApi.loadProducts();
  }
}
