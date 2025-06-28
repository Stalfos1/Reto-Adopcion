import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sugerencia',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './sugerencia.html',
  styleUrls: ['./sugerencia.css']
})
export class Sugerencia implements OnInit {
  personaId: string | null = null;
  mascotasSugeridas: any[] = [];
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.personaId = localStorage.getItem('personaId');
    if (this.personaId) {
      this.cargarMascotasSugeridas(this.personaId);
    } else {
      this.error = "No se encontró personaId, por favor inicia sesión.";
    }
  }

  cargarMascotasSugeridas(personaId: string) {
    this.http.get<any[]>(`/api/mascotas-sugeridas/${personaId}`).subscribe({
      next: (data) => {
        this.mascotasSugeridas = data;
      },
      error: (err) => {
        this.error = "No se pudieron cargar las mascotas sugeridas.";
        console.error(err);
      }
    });
  }
}
