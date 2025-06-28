import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule], // Asegúrate de CommonModule si usas *ngIf
  templateUrl: './home.html',
  styleUrls: ['./home.css'] 
})
export class Home implements OnInit {
  personaId: string | null = '';
  personaNombre: string | null = '';
  reputacionImagenUrl: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.personaId = localStorage.getItem('personaId');
    if (this.personaId) {
      this.getPersonaNombre(this.personaId);
      this.getReputacionImagen(this.personaId);
    }
  }

  getPersonaNombre(id: string) {
    this.http.get<any>(`/api/personas/${id}`).subscribe({
      next: (data) => {
        this.personaNombre = data.nombre;
      },
      error: (err) => {
        console.error('Error al obtener la persona', err);
      }
    });
  }

  getReputacionImagen(id: string) {
    this.http.get<any>(`/api/etiqueta-imagen/${id}`).subscribe({
      next: (data) => {
        this.reputacionImagenUrl = data.imagenUrl;
      },
      error: (err) => {
        console.error('Error al obtener la imagen de reputación', err);
      }
    });
  }
}
