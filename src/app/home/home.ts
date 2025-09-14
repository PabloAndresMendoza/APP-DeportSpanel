import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  constructor(private router: Router  ) {}

  goToLogin() {
    console.log('Botón presionado, navegando a Login...');
    this.router.navigate(['/login']);
  }
}
