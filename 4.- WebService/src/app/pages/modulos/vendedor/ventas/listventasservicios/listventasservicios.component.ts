import { Component, OnInit , ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/tools/dialog/dialog.component';
import {FormBuilder} from "@angular/forms";
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { DataService } from 'src/app/service/data/data.service';
import { Ventas } from 'src/app/modelo/Ventas';
import { VentaService } from 'src/app/service/venta/venta.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listventasservicios',
  templateUrl: './listventasservicios.component.html',
  styleUrls: ['./listventasservicios.component.css']
})
export class ListventasserviciosComponent implements OnInit {


  private apiURL = environment.apiUrl;

  isPopupOpened = true;

  persona:any=[];
  usuario:any=[];

  displayedColumns: string[] = ['ID','USUARIO','CLIENTE','FECHA','HORA','MONTO','ACCIONES'];
 
  public dataSource: MatTableDataSource<Ventas>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private dataArray: any;


  constructor(
              private dialog :MatDialog,
              private snackBar: MatSnackBar,
              public dataService:DataService,
              private formBuilder:FormBuilder,
              private ventaService:VentaService,
              private activateRoute:ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    this.listarVentaServicio()
  }

  listarVentaServicio() {
      this.ventaService.listarVentaServicio()
      .subscribe(res => {
        this.dataArray = res;
        this.dataSource = new MatTableDataSource<Ventas>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  

edit(id: number) {
  /*
  this.categoriaService.buscarCategoria(id).subscribe(
    res => {
      console.log(res)
      this.isPopupOpened = true;
      const dialogRef = this.dialog.open(EditcategoriaComponent, {
        width: '450px',
        data: res
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
            this.listarCategoria();
        }
      });
    },
    err => console.log(err)
  )
  */
}

categoria: string;
imagen: string;

add(){
  /*
  const dialogRef = this.dialog.open(AddcategoriaComponent, {
    width: '450px',
    data: {categoria: this.categoria,imagen:this.imagen}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      this.listarCategoria();
  }
  });
  */
}

openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000,
    verticalPosition: 'bottom',
    horizontalPosition:'right',
  });
}

confirmarDialogo(id:number):void{
  
  const dialogRef=this.dialog.open(DialogComponent,{
        width:'450px',
        data:'¿Esta seguro de desactivar el registro?'
  });

  dialogRef.afterClosed().subscribe(res=>{

    if (res) {
      //this.eliminarCategoria(id);
      this.openSnackBar('Mensaje ','Registro Desactivado!')  
    }
  });
}
/*
eliminarCategoria(id:number){
  
  this.categoriaService.eliminarCategoria(id).subscribe(
    res => {
      this.listarCategoria();
    },
    err => console.log(err)
  )
}
*/
/*
abrirDocumento(id:number) {
  
  window.open(`${this.apiURL}/cotizacion/imprimirCotizacion/${id}`+ '#page=' + 1, '_blank', '');
  
}
*/
abrirDocumentoVenta(id:number) {
  //var id=this.dataService.id_venta;
  window.open(`${this.apiURL}/venta/imprimirHojaServicioVenta/${id}`+ '#page=' + 1, '_blank', '');
}

abrirDocumento(id:number) {
  var id=this.dataService.id_atencion;
  window.open(`${this.apiURL}/atencion/imprimirHojaServicio/${id}`+ '#page=' + 1, '_blank', '');
}
  
}


