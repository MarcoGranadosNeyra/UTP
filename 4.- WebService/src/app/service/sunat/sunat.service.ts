import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SunatService {

  private URL = 'http://servicio.dayangels.com/api/reniec/dni-lite'

  headers=new HttpHeaders();

  constructor(private http: HttpClient, private router: Router) {
    this.headers.append("Content-Type","application/json");
    this.headers.append("Authorization","Bearer "+localStorage.getItem("token"));
   }

  listarPersona(dni: any) {
    return this.http.post<any>(this.URL,{"dni":dni},{headers :this.headers });
  }

}
