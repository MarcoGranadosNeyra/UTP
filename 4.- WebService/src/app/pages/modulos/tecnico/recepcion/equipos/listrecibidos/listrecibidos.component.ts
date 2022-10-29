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
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Recepcion } from 'src/app/modelo/Recepcion';
import { RecepcionService } from 'src/app/service/recepcion/recepcion.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { TecnicoService } from 'src/app/service/tecnico/tecnico.service';
import { AddequipoComponent } from '../dialog/addequipo/addequipo.component';

@Component({
  selector: 'app-listrecibidos',
  templateUrl: './listrecibidos.component.html',
  styleUrls: ['./listrecibidos.component.css']
})
export class ListrecibidosComponent implements OnInit {


  private apiURL = environment.apiUrl;

  isPopupOpened = true;
  recepciones:any=[];
  usuario:any={};
  tecnico:any={};
  recepcion:any={};
  displayedColumns: string[] = ['ID','CLIENTE','EQUIPO','MARCA','MODELO','SERIE','DESCRIPCION','FECHA','HORA','ACCIONES'];
 
  public dataSource: MatTableDataSource<Recepcion>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private dataArray: any;


  constructor(
              private httpClient: HttpClient, 

              private dialog :MatDialog,
              private snackBar: MatSnackBar,
              public dataService:DataService,
              private formBuilder:FormBuilder,
              private recepcionService:RecepcionService,
              private usuarioService:UsuarioService,
              private tecnicoService:TecnicoService,
              private activateRoute:ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    var id: number = Number(localStorage.getItem('id_usuario'));
    this.buscarUsuario(id);
    this.listarEquiposRecibidos();
  }

  listarEquiposRecibidos() {
      this.recepcionService.listarEquiposRecibidos()
      .subscribe(res => {
        this.dataArray = res;
        this.dataSource = new MatTableDataSource<Recepcion>(this.dataArray);
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

id_usuario: number;
id_cliente: number;
equipo: string;
marca: string;
modelo: string;
serie: string;
descripcion: string;

add(){
  
  const dialogRef = this.dialog.open(AddequipoComponent, {
    width: '450px',
    data: {id_usuario: this.id_usuario,id_cliente:this.id_cliente,equipo: this.equipo,marca:this.equipo,modelo: this.modelo,serie:this.serie,descripcion:this.descripcion}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      this.listarEquiposRecibidos();
  }
  });
  
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
        data:'¿Esta seguro de generar la cotizacion?'
  });

  dialogRef.afterClosed().subscribe(res=>{

    if (res) {
      this.router.navigate(['main/tecnico/recepcion/catalogorepuestos']);
      this.buscarRecepcion(id)
      //this.listarRecepcion();
      //this.openSnackBar('Mensaje ','Registro actualizado!')  
    }
  });
}

confirmarDialogoEntregar(id:number):void{
  
  const dialogRef=this.dialog.open(DialogComponent,{
        width:'450px',
        data:'¿Confirma que finaliza la recepcion?'
  });

  dialogRef.afterClosed().subscribe(res=>{

    if (res) {
      //this.router.navigate(['main/tecnico/recepcion/catalogorepuestos']);
      this.finalizarRecepcion(id)
      //this.listarRecepcion();
      //this.openSnackBar('Mensaje ','Registro actualizado!')  
    }
  });
}



finalizarRecepcion(id:number){
  
  this.recepcionService.finalizarRecepcion(id).subscribe(
    res => {
      
      if (res.result===1) {
        //this.router.navigate(['main/tecnico/recepcion/catalogorepuestos']);
        //this.finalizarRecepcion(id)
        //this.listarRecepcion();
        this.openSnackBar('Mensaje ',res.mensaje)  
      }else{
        this.openSnackBar('Mensaje ',res.mensaje)  
      }
    },
    err => console.log(err)
  )
}
 
abrirDocumento(id:number) {
  window.open(`${this.apiURL}/recepcion/imprimirGuiRecepcion/${id}`+ '#page=' + 1, '_blank', '');
}

buscarUsuario(id: number) {
  this.usuarioService.buscarUsuario(id).subscribe(
    res => {
      console.log(res)
      this.usuario=res;
      this.buscarTecnicoByIdUsuario(this.usuario.id_persona);
    },
    err => console.log(err)
  )
}

buscarTecnicoByIdUsuario(id: number) {
  this.tecnicoService.buscarTecnicoByIdPersona(id).subscribe(
    res => {
      console.log(res)
      this.tecnico=res;
    },
    err => console.log(err)
  )
}


buscarRecepcion(id: number) {
  this.recepcionService.buscarRecepcion(id).subscribe(
    res => {
      console.log(res)
      this.recepcion=res;
      this.dataService.id_usuario=this.recepcion.id_usuario;
      this.dataService.id_cliente=this.recepcion.id_cliente;
      
    },
    err => console.log(err)
  )
}

 
}


