import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { saveAS } from 'file-saver/dist/FileSaver';


@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private apiURL = environment.apiUrl;
  
  constructor(private httpClient: HttpClient, private router: Router) { }


  listarVenta() {
    return this.httpClient.get<any>(this.apiURL + '/venta/list');
  }

  listarVentaServicio() {
    return this.httpClient.get<any>(this.apiURL + '/venta/listServicio');
  }

  agregarVenta(venta) {
    return this.httpClient.post<any>(`${this.apiURL}/venta/add/`, venta);
  }

  listarReporteVentas(fechas) {
    return this.httpClient.post<any>(`${this.apiURL}/venta/reporteVentas/`, fechas);
  }

  productosVendidos(fechas) {
    return this.httpClient.post<any>(`${this.apiURL}/venta/productosVendidos/`, fechas);
  }

  repuestosVendidos(fechas) {
    return this.httpClient.post<any>(`${this.apiURL}/venta/repuestosVendidos/`, fechas);
  }

  serviciosVendidos(fechas) {
    return this.httpClient.post<any>(`${this.apiURL}/venta/serviciosVendidos/`, fechas);
  }

  atencionesTecnico(fechas) {
    return this.httpClient.post<any>(`${this.apiURL}/venta/atencionesTecnico/`, fechas);
  }


  getDownloadUrl(id){
    //
    //Get the download url of the file
    //let fullPath = this.apiURL/venta/imprimirVenta/+id;
    //
    // return the file as arraybuffer 
    return this.httpClient.get(`${this.apiURL}/venta/imprimirVenta/${id}`, {
      headers: {
        //'Authorization': 'Bearer ' + this.sessionService.getToken()
      },
      responseType: 'arraybuffer'
    });
  }

  agregarVentaDetalle(detalle) {
    return this.httpClient.post<any>(`${this.apiURL}/detalle/add/`, detalle);
  }

  imprimirVenta(id:number){
    return this.httpClient.get(`${this.apiURL}/venta/imprimirVenta/${id}`, {
      headers: {
        //'Authorization': 'Bearer ' + this.sessionService.getToken()
      },
      responseType: 'arraybuffer'
    }).subscribe(pdf=>{
      const blob = new Blob([pdf],{type:'application/pdf'});
      const fileName='mipdf.pdf';
      saveAS(blob,fileName);
    },err=>{
      console.log(err);
    });
  }

  imprimirReporteVenta(fechas){
    
    return this.httpClient.post<any>(`${this.apiURL}/venta/reporteVentasPDF/`, fechas, {
      headers: {
        //'Authorization': 'Bearer ' + this.sessionService.getToken()
      },
      //responseType: 'arraybuffer'
    }).subscribe(pdf=>{
      const blob = new Blob([pdf],{type:'application/pdf'});
      const fileName='mipdf.pdf';
      saveAS(blob,fileName);
    },err=>{
      console.log(err);
    });
  }


}