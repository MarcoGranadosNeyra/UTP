import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApisPeruService {

  private URL = 'https://dniruc.apisperu.com/api/v1/dni/'

  headers=new HttpHeaders();

  constructor(private http: HttpClient, private router: Router) { }

   getToken() {
      return localStorage.getItem('token');
    
    }

  listarPersona(dni: any) {
    return this.http.get<any>(this.URL+dni);
  }

}