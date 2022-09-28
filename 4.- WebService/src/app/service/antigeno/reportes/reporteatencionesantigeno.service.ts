import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReporteatencionesantigenoService {


  private URL = environment.apiUrl;
  
  constructor(private http: HttpClient, private router: Router) { }

  reporteAtencionesAntigeno(fechas) {
    return this.http.post<any>(this.URL + '/listarreporteatencionesantigeno', fechas);
  }

}

