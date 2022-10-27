import { Component, OnInit , ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { ProductoalmacenService } from 'src/app/service/productoAlmacen/productoalmacen.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/tools/dialog/dialog.component';
import {FormBuilder, FormGroup,FormControl, Validators} from "@angular/forms";
import { Subject } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable} from '@angular/material/table';
import { Tecnico } from 'src/app/modelo/Tecnico';
import { formatDate } from '@angular/common';
import { DataService } from 'src/app/service/data/data.service';
import { TecnicoService } from 'src/app/service/tecnico/tecnico.service';
import { Cliente } from 'src/app/modelo/Cliente';
import { ClienteService } from 'src/app/service/cliente/cliente.service';
import { EditclienteComponent } from '../dialog/editcliente/editcliente.component';
import { AddclienteComponent } from '../dialog/addcliente/addcliente.component';


@Component({
  selector: 'app-listcliente',
  templateUrl: './listcliente.component.html',
  styleUrls: ['./listcliente.component.css']
})
export class ListclienteComponent implements OnInit {


  isPopupOpened = true;

  persona:any=[];
  usuario:any=[];
  objetousuario:any=[];

  displayedColumns: string[] = ['ID','DOCUMENTO','NRO DOCUMENTO','NOMBRE','TELEFONO','DIRECCION','ESTADO','ACCIONES'];
 
  public dataSource: MatTableDataSource<Cliente>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private dataArray: any;

  constructor(
              private dialog :MatDialog,
              private snackBar: MatSnackBar,
              public dataService:DataService,
              private clienteService:ClienteService
              ) { }

  ngOnInit() {

    this.listarCliente();
  }

  async listarCliente() {
      this.clienteService.listarCliente()
      .subscribe(res => {
        this.dataArray = res;
        this.dataSource = new MatTableDataSource<Cliente>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      
      });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  


edit(id: number) {
  
  this.clienteService.buscarCliente(id).subscribe(
    res => {
      console.log(res)
      this.isPopupOpened = true;
      const dialogRef = this.dialog.open(EditclienteComponent, {
        width: '450px',
        data: res
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
            this.listarCliente();
        }
      });
    },
    err => console.log(err)
  )
}


id_persona: number;

add(){
  
  const dialogRef = this.dialog.open(AddclienteComponent, {
    width: '450px',
    data: {id_persona: this.id_persona}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      this.listarCliente();
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
        data:'¿Esta seguro de desactivar el registro?'
  });

  dialogRef.afterClosed().subscribe(res=>{

    if (res) {
      this.eliminarCliente(id);
      this.openSnackBar('Mensaje ','Registro Desactivado!')  
    }

  });
  
}

eliminarCliente(id:number){
  this.clienteService.eliminarCliente(id).subscribe(
    res => {
      this.listarCliente();
    },
    err => console.log(err)
  )
}
  
}