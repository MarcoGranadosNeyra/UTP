import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  private apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  listarCliente() {
    return this.httpClient.get<any>(this.apiURL + '/cliente/list');
  }

  agregarCliente(cliente) {
    return this.httpClient.post(`${this.apiURL}/cliente/agregar/`, cliente);
  }

  actualizarCliente(cliente) {
          return this.httpClient.post(`${this.apiURL}/cliente/actualizar/`, cliente);
  }

  buscarClientePorIdPersona(id: number) {
    return this.httpClient.get(`${this.apiURL}/cliente/buscar/persona/${id}`);
  }


  buscarCliente(id: number) {
    return this.httpClient.get(`${this.apiURL}/cliente/buscar/${id}`);
  }

  validarCliente(datos: any) {
    return this.httpClient.post<any>(this.apiURL + '/cliente/validar', datos);
  }

  eliminarCliente(id: number) {
    return this.httpClient.delete(`${this.apiURL}/cliente/eliminar/${id}`);
  }





}