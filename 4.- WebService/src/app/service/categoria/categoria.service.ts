import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient, private router: Router) { }

  listarCategoria() {
      return this.httpClient.get(`${this.apiURL}/categoria/list`);
  }

  
  agregarCategoria(categoria) {
    return this.httpClient.post(`${this.apiURL}/categoria/agregar/`, categoria);
  }

  actualizarCategoria(categoria) {
          return this.httpClient.post(`${this.apiURL}/categoria/actualizar/`, categoria);
  }

  buscarCategoria(id: number) {
    return this.httpClient.get(`${this.apiURL}/categoria/buscar/${id}`);
  }

  eliminarCategoria(id: number) {
    return this.httpClient.delete(`${this.apiURL}/categoria/eliminar/${id}`);
  }

}