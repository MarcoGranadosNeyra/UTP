import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  private apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  buscarCliente(id: number) {
    return this.httpClient.get(`${this.apiURL}/cliente/buscar/${id}`);
  }

  buscarClientePorIdPersona(id: number) {
    return this.httpClient.get(`${this.apiURL}/cliente/buscar/persona/${id}`);
  }



}