import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  constructor(private router: Router  ) {}

  goToUser() {
    this.router.navigate(['/user']);
  }

  goToProduct() {
    this.router.navigate(['/product']);
  }
}
