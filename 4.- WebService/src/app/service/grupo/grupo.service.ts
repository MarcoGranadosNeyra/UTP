import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  listarGrupo() {
      return this.httpClient.get(`${this.apiURL}/grupo/list`);
  }

  

}