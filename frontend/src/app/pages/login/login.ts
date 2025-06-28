import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  personaId: number | null = null;

  constructor(private router: Router) {}

  login() {
    if (this.personaId && this.personaId > 0) {
      // Guarda el ID para simular sesión
      localStorage.setItem('personaId', this.personaId.toString());
      this.router.navigate(['/home']);
    } else {
      alert('Por favor ingresa un ID válido.');
    }
  }
}
