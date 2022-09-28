import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {


  private apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient, private router: Router) { }

  buscarAsistencia(id: number) {
    return this.httpClient.get(`${this.apiURL}/buscarAsistencia/${id}`);
}

  modificarAsistencia(asistencia) {
    return this.httpClient.put(`${this.apiURL}/modificarAsistencia/`, asistencia);
  }

  listarReporteAsistencia(fechas) {
    return this.httpClient.post<any>(this.apiURL + '/listarReporteAsistencia', fechas);
  }

  }
