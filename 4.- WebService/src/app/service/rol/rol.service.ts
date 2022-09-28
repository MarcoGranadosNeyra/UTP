import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private apiURL = environment.apiUrl;
  
  constructor(private httpClient: HttpClient, private router: Router) { }

  
  listarRol() {
    return this.httpClient.get<any>(this.apiURL + '/usuario/roles');
  }



}