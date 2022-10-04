import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  private apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  listarPermiso() {
      return this.httpClient.get(`${this.apiURL}/permiso/list`);
  }

  
  agregarPermiso(permiso) {
    return this.httpClient.post(`${this.apiURL}/permiso/agregar/`, permiso);
  }

  actualizarPermiso(permiso) {
          return this.httpClient.post(`${this.apiURL}/permiso/actualizar/`, permiso);
  }

  buscarPermiso(id: number) {
    return this.httpClient.get(`${this.apiURL}/permiso/buscar/${id}`);
  }

  eliminarPermiso(id: number) {
    return this.httpClient.delete(`${this.apiURL}/permiso/eliminar/${id}`);
  }

}