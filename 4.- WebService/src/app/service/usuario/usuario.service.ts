import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiURL = environment.apiUrl;
  
  constructor(private httpClient: HttpClient, private router: Router) { }

  /*
  login(user) {
    //console.log(user)
    //return this.httpClient.get<any>(this.apiURL + '/Usuario/list', user);
    return this.httpClient.post<any>(this.apiURL + '/Usuario/login');
  }
  */

  login(user) {
    return this.httpClient.post<any>(this.apiURL + '/usuario/login', user);
  }

  registro(user) {
    return this.httpClient.post<any>(this.apiURL + '/usuario/add', user);
  }


  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logeado() {
    return !!localStorage.getItem('logeado');
  }

  cerrarSession() {
    localStorage.removeItem('logeado');
    this.router.navigate(['/login']);
  }
  
 
  logout() {
    localStorage.removeItem('logeado');
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  /*
  listarPerfil() {
    return this.httpClient.get<any>(this.apiURL + '/perfil');
  }
  */
  listarPerfil(id: number) {
    return this.httpClient.get(`${this.apiURL}/perfil/${id}`);
  }

  listarPerfiles() {
    return this.httpClient.get<any>(this.apiURL + '/perfiles');
  }

  /*
  listarModulosUsuario(user: any) {
    return this.httpClient.post<any>(this.apiURL + '/usuario/modulosUsuario',user);
  }
  */

  listarUsuario() {
    return this.httpClient.get(this.apiURL + '/usuario/list');
  }


  eliminarUsuario(id: number) {
    return this.httpClient.delete(`${this.apiURL}/usuario/${id}`);
    }

  listarPersonaById(idPersona: number) {
    return this.httpClient.get(`${this.apiURL}/persona/${idPersona}`);
  }

  listarModulosUsuario(idPersona: number) {
    return this.httpClient.get<any>(`${this.apiURL}/usuario/modulosUsuario/${idPersona}`);
  }


  listarUsuarioByUsuario(user: any) {
    return this.httpClient.post<any>(this.apiURL + '/buscarUsuario', user);
  }

  actualizarUsuario(usuario) {
    return this.httpClient.post(`${this.apiURL}/usuario/actualizar/`, usuario);
  }

  agregarUsuario(persona: any) {
    return this.httpClient.post<any>(this.apiURL + '/usuario/add', persona);
  }

  buscarUsuario(id: number) {
    return this.httpClient.get(`${this.apiURL}/usuario/buscar/${id}`);
  }

  
  buscarNombreUsuario(user: any) {
    return this.httpClient.post<any>(this.apiURL + '/usuario/buscar', user);
  }



}

