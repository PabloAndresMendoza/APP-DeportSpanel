import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from './services/data';


@Component({
  selector: 'app-root',
  standalone: true,          
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.css'
})
export class App implements OnInit {

  constructor(private productService: DataService) {}

  ngOnInit(): void {
    this.productService.loadProducts();
  }
}
