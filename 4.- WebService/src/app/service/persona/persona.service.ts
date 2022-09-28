import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private URL = environment.apiUrl;
  
  constructor(private http: HttpClient, private router: Router) { }

  
  listarDepartamento() {
    return this.http.get<any>(this.URL + '/persona/departamento');
  }

  listarProvincia(idDepartamento: string) {
    return this.http.get(`${this.URL}/persona/provincia/${idDepartamento}`);
  }

  listarDistrito(idProvincia: string) {
    return this.http.get(`${this.URL}/persona/distrito/${idProvincia}`);
  }


  listarDocumento() {
    return this.http.get<any>(this.URL + '/persona/documento');
  }

  listarSexo() {
    return this.http.get<any>(this.URL + '/persona/sexo');
  }

  listarPersona() {
    return this.http.get<any>(this.URL + '/persona/list');
  }

  listarPersonaById(idPersona: number) {
    return this.http.get<any>(`${this.URL}/persona/${idPersona}`);
  }

  listarPersonaByDNI(datos: any) {
    return this.http.post<any>(this.URL + '/persona/validarPersona', datos);
  }

  agregarPersona(persona: any) {
    return this.http.post<any>(this.URL + '/persona/add', persona);
  }
/*
actualizarPersona(idPersona: number, persona: any) {
  return this.http.put(`${this.URL}/persona/${idPersona}`, persona);
}
*/
  actualizarPersona(persona: any) {
    return this.http.post<any>(this.URL + '/persona/actualizar', persona);
  }
  eliminarPersona(idPersona: number) {
    return this.http.delete(`${this.URL}/persona/${idPersona}`);
  }

}