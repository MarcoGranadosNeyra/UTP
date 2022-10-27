import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  private URL = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  listarDia() {
    return this.http.get<any>(this.URL + '/calendario/dia/list');
  }

  listarHora() {
    return this.http.get<any>(this.URL + '/calendario/hora/list');
  }


  listarCalendario() {
    return this.http.get<any>(this.URL + '/calendario/list');
  }

  buscarCalendario(id: number) {
    return this.http.get(`${this.URL}/calendario/buscar/${id}`);
  }

  agregarCalendario(calendario) {
    return this.http.post<any>(this.URL + '/calendario/agregar', calendario);
  }

  actualizarCalendario(calendario) {
    return this.http.post(`${this.URL}/calendario/actualizar`, calendario);
  }







  eliminarCalendario(idCalendar: number) {
    return this.http.delete(`${this.URL}/calendario/${idCalendar}`);
  }

  activarCalendario(idCalendar: number) {
    return this.http.delete(`${this.URL}/activarcalendario/${idCalendar}`);
  }

  listarCalendarioPorProducto(calendario) {
    return this.http.post<any>(this.URL + '/calendario/listarCalendarioPorProducto', calendario);
  }


}





