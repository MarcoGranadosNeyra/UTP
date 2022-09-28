import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  private apiURL = environment.apiUrl;
  
  constructor(private httpClient: HttpClient, private router: Router) { }

  
  listarTecnico() {
    return this.httpClient.get<any>(this.apiURL + '/tecnico/list');
  }

  agregarTecnico(tecnico) {
    return this.httpClient.post(`${this.apiURL}/tecnico/agregar/`, tecnico);
  }

  actualizarTecnico(tecnico) {
          return this.httpClient.post(`${this.apiURL}/tecnico/actualizar/`, tecnico);
  }

  buscarTecnico(id: number) {
    return this.httpClient.get(`${this.apiURL}/tecnico/buscar/${id}`);
  }

  eliminarTecnico(id: number) {
    return this.httpClient.delete(`${this.apiURL}/tecnico/eliminar/${id}`);
  }


}