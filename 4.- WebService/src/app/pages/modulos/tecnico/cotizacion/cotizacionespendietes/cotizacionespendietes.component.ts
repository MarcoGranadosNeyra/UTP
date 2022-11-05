import { Component, OnInit , ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/tools/dialog/dialog.component';
import {FormBuilder, FormGroup,FormControl, Validators} from "@angular/forms";
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { DataService } from 'src/app/service/data/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CotizacionService } from 'src/app/service/cotizacion/cotizacion.service';
import { Cotizacion } from 'src/app/modelo/Cotizacion';


@Component({
  selector: 'app-cotizacionespendietes',
  templateUrl: './cotizacionespendietes.component.html',
  styleUrls: ['./cotizacionespendietes.component.css']
})
export class CotizacionespendietesComponent implements OnInit {


  private apiURL = environment.apiUrl;

  isPopupOpened = true;
  atenciones:any=[];
  cotizacion:any={};
  displayedColumns: string[] = ['ID','TECNICO','CLIENTE','FECHA','HORA','ESTADO','ACCIONES'];
 
  public dataSource: MatTableDataSource<Cotizacion>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private dataArray: any;


  constructor(
              private httpClient: HttpClient, 

              private dialog :MatDialog,
              private snackBar: MatSnackBar,
              public dataService:DataService,
              private formBuilder:FormBuilder,
              private cotizacionService:CotizacionService,
              private activateRoute:ActivatedRoute,
              private router : Router) { }

  ngOnInit() {

    this.listarCotizacionesPendientes();
  }

  listarCotizacionesPendientes() {
    this.cotizacionService.listarCotizacionesPendientes()
    .subscribe(res => {     
      this.dataArray = res;
      this.dataSource = new MatTableDataSource<Cotizacion>(this.dataArray);
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
  this.atencionService.buscarCategoria(id).subscribe(
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
        data:'¿confirma que se aprueba esta cotizacion?'
  });

  dialogRef.afterClosed().subscribe(res=>{

    if (res) {
      this.aprobarCotizacion(id);
      this.openSnackBar('Mensaje ','Registro actualizado!')  
    }
  });
  
}


aprobarCotizacion(id:number){
  
  this.cotizacionService.aprobarCotizacion(id).subscribe(
    res => {
      
      this.listarCotizacionesPendientes();
    },
    err => console.log(err)
  )
}


abrirDocumento(id:number) {
  
  window.open(`${this.apiURL}/cotizacion/imprimirCotizacion/${id}`+ '#page=' + 1, '_blank', '');
  
}


confirmarDialogoEnviarCorreo(id:number):void{
  
  const dialogRef=this.dialog.open(DialogComponent,{
        width:'450px',
        data:'¿confirma que se enviara por correo esta cotizacion?'
  });

  dialogRef.afterClosed().subscribe(res=>{

    if (res) {
      this.buscarCotizacion(id);
      //this.openSnackBar('Mensaje ','Registro actualizado!')  
    }
  });
  
}

buscarCotizacion(id:number){
  
  this.cotizacionService.buscarCotizacion(id).subscribe(
    res => {
      this.cotizacion=res;
      this.enviarCorreo();
    },
    err => console.log(err)
  )
}

enviarCorreo() {

  this.cotizacionService.enviarCorreo(this.cotizacion)
  .subscribe( res => {

    this.openSnackBar('Mensaje ',res.mensaje)  ;
    
  });

}
  
}


