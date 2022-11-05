import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  private apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  listarCotizacionesPendientes() {
    return this.httpClient.get(`${this.apiURL}/cotizacion/pendientes`);
  }

  listarCotizacionesAprobadas() {
  return this.httpClient.get(`${this.apiURL}/cotizacion/aprobadas`);
  }

  listarCotizacionesFinalizadas() {
    return this.httpClient.get(`${this.apiURL}/cotizacion/finalizadas`);
    }
  

  listarCotizacionDetalle(id: number) {
    return this.httpClient.get(`${this.apiURL}/cotizaciondetalle/cotizacion/${id}`);
  }
  
  agregarCotizacion(cotizacion) {
    return this.httpClient.post<any>(`${this.apiURL}/cotizacion/agregar/`, cotizacion);
  }

  agregarCotizacionDetalle(detalle) {
    return this.httpClient.post<any>(`${this.apiURL}/cotizaciondetalle/add/`, detalle);
  }

  aprobarCotizacion(id: number) {
    return this.httpClient.delete(`${this.apiURL}/cotizacion/aprobar/${id}`);
  }

  finalizarCotizacion(id: number) {
    return this.httpClient.delete(`${this.apiURL}/cotizacion/finalizar/${id}`);
  }

  buscarCotizacion(id: number) {
    return this.httpClient.get<any>(`${this.apiURL}/cotizacion/buscar/${id}`);
  }

  enviarCorreo(cotizacion) {
    return this.httpClient.post<any>(`${this.apiURL}/cotizacion/enviarcorreo/`, cotizacion);
  }


}