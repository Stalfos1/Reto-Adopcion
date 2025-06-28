import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './galeria.html',
  styleUrls: ['./galeria.css']
})
export class Galeria implements OnInit {
  mascotas: any[] = [];
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('/api/mascotas').subscribe({
      next: (data) => this.mascotas = data,
      error: (err) => {
        this.error = 'No se pudieron cargar las mascotas.';
        console.error(err);
      }
    });
  }
}
