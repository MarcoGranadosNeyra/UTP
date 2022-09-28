import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

private URL = environment.apiUrl;

constructor(private http: HttpClient, private router: Router) { }

listarEspecialidad() {
  return this.http.get<any>(this.URL + '/tecnico/especialidad');
}

listarEspecialidadById(idEspecialidad: number) {
  return this.http.get(`${this.URL}/especialidad/${idEspecialidad}`);
}

agregarEspecialidad(especialidad: any) {
  return this.http.post<any>(this.URL + '/especialidad/add', especialidad);
}

actualizarEspecialidad(idEspecialidad: number, especialidad: any) {
  return this.http.put(`${this.URL}/especialidad/${idEspecialidad}`, especialidad);
}

eliminarEspecialidad(idEspecialidad: number) {
  return this.http.delete(`${this.URL}/especialidad/${idEspecialidad}`);
}


}






