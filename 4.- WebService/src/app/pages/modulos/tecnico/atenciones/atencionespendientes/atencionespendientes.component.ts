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
import { Atencion } from 'src/app/modelo/Atencion';
import { AtencionService } from 'src/app/service/atencion/atencion.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-atencionespendientes',
  templateUrl: './atencionespendientes.component.html',
  styleUrls: ['./atencionespendientes.component.css']
})
export class AtencionespendientesComponent implements OnInit {


  private apiURL = environment.apiUrl;

  isPopupOpened = true;
  atenciones:any=[];

  displayedColumns: string[] = ['ID','SERVICIO','PRECIO','CLIENTE','FECHA','HORA','ATENCION','ACCIONES'];
 
  public dataSource: MatTableDataSource<Atencion>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private dataArray: any;


  constructor(
              private httpClient: HttpClient, 

              private dialog :MatDialog,
              private snackBar: MatSnackBar,
              public dataService:DataService,
              private formBuilder:FormBuilder,
              private atencionService:AtencionService,
              private activateRoute:ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    var id: number = Number(localStorage.getItem('id_usuario'));
    this.listarAtenciones(id);
  }

  listarAtenciones(id_usuario:number) {
      this.atencionService.listarAtencionesPendientes(id_usuario)
      .subscribe(res => {
        
        this.dataArray = res.pendientes;
        this.dataSource = new MatTableDataSource<Atencion>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
        console.log(res)
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
        data:'¿confirma que finaliza la atencion?'
  });

  dialogRef.afterClosed().subscribe(res=>{

    if (res) {
      this.finalizarAtencion(id);
      this.openSnackBar('Mensaje ','Registro actualizado!')  
    }
  });
}

finalizarAtencion(id:number){
  
  this.atencionService.finalizarAtencion(id).subscribe(
    res => {
      var id: number = Number(localStorage.getItem('id_usuario'));
      this.listarAtenciones(id);
    },
    err => console.log(err)
  )
}

abrirDocumento(id:number) {
  window.open(`${this.apiURL}/atencion/imprimirHojaServicio/${id}`+ '#page=' + 1, '_blank', '');
}
  
}


