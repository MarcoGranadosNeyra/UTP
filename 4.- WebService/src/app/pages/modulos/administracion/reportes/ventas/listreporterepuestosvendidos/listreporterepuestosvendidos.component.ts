import { Component, OnInit , ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup,FormControl, Validators} from "@angular/forms";
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { DataService } from 'src/app/service/data/data.service';
import { DatePipe } from '@angular/common';
import { ReporteProducto } from 'src/app/modelo/ReporteProducto';
import { VentaService } from 'src/app/service/venta/venta.service';
  
import * as printJS from 'print-js';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'

import { saveAS } from 'file-saver/dist/FileSaver';

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-listreporterepuestosvendidos',
  templateUrl: './listreporterepuestosvendidos.component.html',
  styleUrls: ['./listreporterepuestosvendidos.component.css']
})
export class ListreporterepuestosvendidosComponent implements OnInit {

  private apiURL = environment.apiUrl;

  isPopupOpened = true;
  public mostrar = false;
  persona:any=[];
  usuario:any=[];

  displayedColumns: string[] = ['REPUESTO','CANTIDAD','MONTO'];
 
  public dataSource: MatTableDataSource<ReporteProducto>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private dataArray: any;
  formularioFechas: FormGroup;

  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');

  constructor(
              private dialog :MatDialog,
              public dataService:DataService,
              private formBuilder:FormBuilder,
              private ventaService:VentaService,
              private activateRoute:ActivatedRoute,
              private router : Router
              ) { }

  ngOnInit() {
    this.validarFechas();
    this.repuestosVendidos();
  }

  mostrarocultar(){
    this.mostrar=true
  }

  generarReporte(){
    this.repuestosVendidos();
    this.mostrarocultar();
  }

  validarFechas(){
    this.formularioFechas = this.formBuilder.group({
      fecha1            :  [this.today, Validators.required],
      fecha2            :  [this.today, Validators.required]
    });
  }

  repuestosVendidos() {
  if(this.formularioFechas.valid){
      this.ventaService.repuestosVendidos(this.formularioFechas.value)
      .subscribe(res => {
        this.dataArray = res;
        this.dataSource = new MatTableDataSource<ReporteProducto>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  

  descargarDocumento() {
    var fecha1=this.formularioFechas.get('fecha1').value;
    var fecha2=this.formularioFechas.get('fecha2').value;
    const pdfUrl = `${this.apiURL}/venta/reporteRepuestosVendidosPDF/${fecha1}/${fecha2}`;
    const pdfName = 'reporteRepuestosVendidos_'+fecha1+fecha2;
    FileSaver.saveAs(pdfUrl, pdfName);
  }

  abrirDocumento() {
    var fecha1=this.formularioFechas.get('fecha1').value;
    var fecha2=this.formularioFechas.get('fecha2').value;
    window.open(`${this.apiURL}/venta/reporteRepuestosVendidosPDF/${fecha1}/${fecha2}`+ '#page=' + 1, '_blank', '');
  }
  
}