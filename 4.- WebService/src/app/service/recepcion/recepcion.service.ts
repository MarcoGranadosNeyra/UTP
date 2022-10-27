import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RecepcionService {


  private apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient, private router: Router) { }

  listarEquiposRecibidos() {
      return this.httpClient.get(`${this.apiURL}/recepcion/equipos/recibidos`);
  }

  listarEquiposEntregados() {
    return this.httpClient.get(`${this.apiURL}/recepcion/equipos/entregados`);
}

  buscarRecepcion(id: number) {
    return this.httpClient.get(`${this.apiURL}/recepcion/buscar/${id}`);
  }

  finalizarRecepcion(id: number) {
    return this.httpClient.delete<any>(`${this.apiURL}/recepcion/finalizar/${id}`);
  }




}