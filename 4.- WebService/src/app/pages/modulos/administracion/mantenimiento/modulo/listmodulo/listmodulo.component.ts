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

import { Modulo } from 'src/app/modelo/Modulo';
import { ModuloService } from 'src/app/service/modulo/modulo.service';
import { AddmoduloComponent } from '../dialog/addmodulo/addmodulo.component';
import { EditmoduloComponent } from '../dialog/editmodulo/editmodulo.component';

@Component({
  selector: 'app-listmodulo',
  templateUrl: './listmodulo.component.html',
  styleUrls: ['./listmodulo.component.css']
})
export class ListmoduloComponent implements OnInit {

  isPopupOpened = true;


  displayedColumns: string[] = ['ID','MODULO','URL','ESTADO','ACCIONES'];
 
  public dataSource: MatTableDataSource<Modulo>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private dataArray: any;

  constructor(
              private dialog :MatDialog,
              private snackBar: MatSnackBar,
              public dataService:DataService,
              private formBuilder:FormBuilder,
              private moduloService:ModuloService,
              private activateRoute:ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    this.listarModulo()
  }

  listarModulo() {
      this.moduloService.listarModulo()
      .subscribe(res => {
        console.log(res)
        this.dataArray = res;
        this.dataSource = new MatTableDataSource<Modulo>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  

edit(id: number) {
  
  this.moduloService.buscarModulo(id).subscribe(
    res => {
      console.log(res)
      this.isPopupOpened = true;
      const dialogRef = this.dialog.open(EditmoduloComponent, {
        width: '450px',
        data: res
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
            this.listarModulo();
        }
      });
    },
    err => console.log(err)
  )
  
}

modulo: string;
url: string;

add(){
  
  const dialogRef = this.dialog.open(AddmoduloComponent, {
    width: '450px',
    data: {modulo: this.modulo,url:this.url}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      this.listarModulo();
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
      this.eliminarModulo(id);
      this.openSnackBar('Mensaje ','Registro Desactivado!')  
    }
  });
}

eliminarModulo(id:number){
  
  this.moduloService.eliminarModulo(id).subscribe(
    res => {
      this.listarModulo();
    },
    err => console.log(err)
  )
}
  
}


