import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private URL = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  listarPacienteByIdUsuario() {
    return this.http.get<any>(this.URL + '/pacienteusuario');
  }


}
