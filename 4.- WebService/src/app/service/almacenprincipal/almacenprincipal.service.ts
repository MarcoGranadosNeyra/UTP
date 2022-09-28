import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlmacenprincipalService {

  private apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient, private router: Router) { }

  listarAlmacenPrincipal(id_sucursal: number) {
      return this.httpClient.get(`${this.apiURL}/AlmacenPrincipal/${id_sucursal}`);
  }


  listarIngresosAlmacenPrincipal(fechas) {
    return this.httpClient.post<any>(this.apiURL + '/listarIngresosAlmacenPrincipal', fechas);
  }

  listarSalidasAlmacenPrincipal(fechas) {
    return this.httpClient.post<any>(`${this.apiURL}/listarSalidasAlmacenPrincipal/`,fechas);
  }

  buscarAlmacenPrincipal(id: number) {
      return this.httpClient.get(`${this.apiURL}/buscarAlmacenPrincipal/${id}`);
  }

  buscarAlmacenPrincipalProducto(id: number) {
    return this.httpClient.get(`${this.apiURL}/buscarAlmacenPrincipalProducto/${id}`);
}

  agregarIngresoAlmacenPrincipal(almacen) {
      return this.httpClient.put(`${this.apiURL}/Ingresos/AlmacenPrincipal/`, almacen);
  }

  agregarSalidaAlmacenPrincipal(almacen) {
      return this.httpClient.put(`${this.apiURL}/Salidas/AlmacenPrincipal/`, almacen);
  }

  agregarProductoAlmacenPrincipal(almacen) {
    return this.httpClient.post(`${this.apiURL}/agregarProductoAlmacenPrincipal/`, almacen);
  }

  listarZonaAlmacen() {
    return this.httpClient.get(`${this.apiURL}/listarZonaAlmacen/`);
  }


}

