import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  agregarPago(pago) {
    return this.httpClient.post(`${this.apiURL}/pago/agregar/`, pago);
  }



}