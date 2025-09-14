import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,          
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.css'
})
export class App {
  protected title = 'DeportSpanel';
}
