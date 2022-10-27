import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  private apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }


  listarAtencionesPendientes(idUsuario: number) {
    return this.httpClient.get<any>(this.apiURL + '/atencion/pendientes/'+`${idUsuario}`);
  }

  listarAtencionesFinalizadas(idUsuario: number) {
    return this.httpClient.get<any>(this.apiURL + '/atencion/finalizadas/'+`${idUsuario}`);
  }
  
  agregarAtencion(atencion) {
    return this.httpClient.post<any>(`${this.apiURL}/atencion/agregar/`, atencion);
  }

  finalizarAtencion(id: number) {
    return this.httpClient.delete(`${this.apiURL}/atencion/finalizar/${id}`);
  }


}