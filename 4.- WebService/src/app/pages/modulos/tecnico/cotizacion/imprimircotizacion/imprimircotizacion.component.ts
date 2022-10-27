import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/service/venta/venta.service';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { saveAS } from 'file-saver/dist/FileSaver';
import { DataService } from 'src/app/service/data/data.service';
declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-imprimircotizacion',
  templateUrl: './imprimircotizacion.component.html',
  styleUrls: ['./imprimircotizacion.component.css']
})
export class ImprimircotizacionComponent implements OnInit {


  private apiURL = environment.apiUrl;
  
  constructor(
              private httpClient: HttpClient, 
              private router: Router,
              private dataService:DataService,
              ) { }

  ngOnInit(

  ): void {
  }

  imprimirVenta(){
    //console.log("huevon");
    
    this.httpClient.get<any>('http://192.168.0.106:8084/apiUTP/webresources/cotizacion/imprimirCotizacion/72', {responseType: 'blob' as 'json'}).subscribe(pdf => {
      //const blob = new Blob([pdf],{type:'application/pdf'});
      const fileName='mipdf.pdf';
      saveAS(pdf,fileName);
    },err=>{
      console.log(err);
    });
    
  }

  imprimirVenta5(){
    var id:number=72
    return this.httpClient.get(`${this.apiURL}/cotizacion/imprimirVenta/${id}`, {
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

  descargarDocumentoVenta() {
    var id=this.dataService.id_cotizacion;
    const pdfUrl = `${this.apiURL}/cotizacion/imprimirCotizacion/${id}`;
    const pdfName = 'documentoCotizacion_'+id;
    FileSaver.saveAs(pdfUrl, pdfName);
  }

  abrirDocumentoVenta() {
    var id=this.dataService.id_cotizacion;
    window.open(`${this.apiURL}/cotizacion/imprimirCotizacion/${id}`+ '#page=' + 1, '_blank', '');
  }


}
