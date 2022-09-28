import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnidadalmacenService {

  private apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient, private router: Router) { }

  listarUnidadAlmacen() {
      return this.httpClient.get(`${this.apiURL}/listarUnidadAlmacen`);
  }

}