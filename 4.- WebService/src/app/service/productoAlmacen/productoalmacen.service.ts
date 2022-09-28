import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoalmacenService {

  private apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient, private router: Router) { }

  listarProductoAlmacen() {
      return this.httpClient.get(`${this.apiURL}/listarProductoAlmacen`);
  }

  buscarProductoAlmacen(id: number) {
    return this.httpClient.get(`${this.apiURL}/buscarProductoAlmacen/${id}`);
  }

  agregarProductoAlmacen(productoAlmacen) {
  return this.httpClient.post(`${this.apiURL}/agregarProductoAlmacen/`, productoAlmacen);
  }

  actualizarProductoAlmacen(productoAlmacen) {
      return this.httpClient.put(`${this.apiURL}/actualizarProductoAlmacen/`, productoAlmacen);
  }

  eliminarProductoAlmacen(id: number) {
  return this.httpClient.delete(`${this.apiURL}/eliminarProductoAlmacen/${id}`);
  }



}