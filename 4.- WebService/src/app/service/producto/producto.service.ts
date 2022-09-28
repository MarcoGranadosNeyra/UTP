import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient, private router: Router) { }

  listarProducto() {
      return this.httpClient.get(`${this.apiURL}/producto/list`);
  }

  listarServicio() {
    return this.httpClient.get(`${this.apiURL}/servicio/list`);
}

listarRepuesto() {
  return this.httpClient.get(`${this.apiURL}/repuesto/list`);
}

  agregarProducto(producto) {
    return this.httpClient.post(`${this.apiURL}/producto/agregar/`, producto);
  }

  agregarServicio(producto) {
    return this.httpClient.post(`${this.apiURL}/servicio/agregar/`, producto);
  }

  agregarRepuesto(producto) {
    return this.httpClient.post(`${this.apiURL}/repuesto/agregar/`, producto);
  }

  actualizarProducto(producto) {
    return this.httpClient.post(`${this.apiURL}/producto/actualizar/`, producto);
  }

  actualizarServicio(producto) {
    return this.httpClient.post(`${this.apiURL}/servicio/actualizar/`, producto);
  }

  actualizarRepuesto(producto) {
    return this.httpClient.post(`${this.apiURL}/repuesto/actualizar/`, producto);
  }

  buscarProducto(id: number) {
    return this.httpClient.get(`${this.apiURL}/producto/buscar/${id}`);
  }

  buscarServicio(id: number) {
    return this.httpClient.get(`${this.apiURL}/servicio/buscar/${id}`);
  }

  buscarRepuesto(id: number) {
    return this.httpClient.get(`${this.apiURL}/repuesto/buscar/${id}`);
  }

  eliminarProducto(id: number) {
    return this.httpClient.delete(`${this.apiURL}/producto/eliminar/${id}`);
  }

  eliminarServicio(id: number) {
    return this.httpClient.delete(`${this.apiURL}/producto/eliminar/${id}`);
  }

  eliminarRepuesto(id: number) {
    return this.httpClient.delete(`${this.apiURL}/producto/eliminar/${id}`);
  }


}