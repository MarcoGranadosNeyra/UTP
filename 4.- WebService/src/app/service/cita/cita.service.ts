import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

 private URL = environment.apiUrl;

 constructor(private http: HttpClient, private router: Router) { }

 listarCita() {
   return this.http.get<any>(this.URL + '/cita');
 }

 listarCitaById(idCita: number) {
   return this.http.get(`${this.URL}/cita/${idCita}`);
 }

 listarCitaByIdCalendario(id_calendario) {
   return this.http.post<any>(this.URL + '/citacalendario', id_calendario);
 }

 agregarCita(cita) {
   return this.http.post<any>(this.URL + '/cita/add', cita);
 }

 actualizarCita(idCita: number, cita) {
   return this.http.put(`${this.URL}/cita/update/${idCita}`, cita);
 }

 eliminarCita(idCita: number) {
   return this.http.delete(`${this.URL}/cita/${idCita}`);
 }

}