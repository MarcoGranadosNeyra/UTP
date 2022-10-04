import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  private apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  agregarAtencion(atencion) {
    return this.httpClient.post<any>(`${this.apiURL}/atencion/agregar/`, atencion);
  }


}