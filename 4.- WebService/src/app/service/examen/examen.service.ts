import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  private URL = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  listarExamenByIdEspecialidad(idEspecialidad: number) {
    return this.http.get(`${this.URL}/examenespecialidad/${idEspecialidad}`);
  }

  listarExamenById(idExamen: number) {
    return this.http.get(`${this.URL}/examen/${idExamen}`);
  }

}


