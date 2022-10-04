import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {


  private apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  listarModulo() {
      return this.httpClient.get(`${this.apiURL}/modulo/list`);
  }

  
  agregarModulo(modulo) {
    return this.httpClient.post(`${this.apiURL}/modulo/agregar/`, modulo);
  }

  actualizarModulo(modulo) {
          return this.httpClient.post(`${this.apiURL}/modulo/actualizar/`, modulo);
  }

  buscarModulo(id: number) {
    return this.httpClient.get(`${this.apiURL}/modulo/buscar/${id}`);
  }

  eliminarModulo(id: number) {
    return this.httpClient.delete(`${this.apiURL}/modulo/eliminar/${id}`);
  }

}