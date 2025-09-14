import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private router: Router  ) {}

  goToDashboard() {
    console.log('Botón presionado, navegando a Login...');
    this.router.navigate(['/dashboard']);
  }
}
