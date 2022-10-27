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

import { Calendario } from 'src/app/modelo/Calendario';
import { CalendarioService } from 'src/app/service/calendario/calendario.service';
import { EditcalendarioComponent } from '../dialog/editcalendario/editcalendario.component';
import { AddcalendarioComponent } from '../dialog/addcalendario/addcalendario.component';

@Component({
  selector: 'app-listcalendario',
  templateUrl: './listcalendario.component.html',
  styleUrls: ['./listcalendario.component.css']
})
export class ListcalendarioComponent implements OnInit {


  isPopupOpened = true;

  persona:any=[];
  usuario:any=[];

  displayedColumns: string[] = ['ID','SERVICIO','TECNICO','DIA','HORA','LIBRE','ESTADO','ACCIONES'];
 
  public dataSource: MatTableDataSource<Calendario>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private dataArray: any;


  constructor(
              private dialog :MatDialog,
              private snackBar: MatSnackBar,
              public dataService:DataService,
              private formBuilder:FormBuilder,
              private calendarioService:CalendarioService,
              private activateRoute:ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    this.listarCalendario()
  }

  listarCalendario() {
      this.calendarioService.listarCalendario()
      .subscribe(res => {
        
        this.dataArray = res;
        this.dataSource = new MatTableDataSource<Calendario>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
      });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  

edit(id: number) {
  
  this.calendarioService.buscarCalendario(id).subscribe(
    res => {
      console.log(res)
      this.isPopupOpened = true;
      const dialogRef = this.dialog.open(EditcalendarioComponent, {
        width: '450px',
        data: res
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
            this.listarCalendario();
        }
      });
    },
    err => console.log(err)
  )
  
}

id_producto: number;
id_tecnico: number;
id_dia: number;
id_hora: number;

add(){
  
  const dialogRef = this.dialog.open(AddcalendarioComponent, {
    width: '450px',
    data: {id_producto: this.id_producto,id_tecnico:this.id_tecnico,id_dia: this.id_dia,id_hora:this.id_hora}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      this.listarCalendario();
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
      this.eliminarCategoria(id);
      this.openSnackBar('Mensaje ','Registro Desactivado!')  
    }
  });
}

eliminarCategoria(id:number){
  /*
  this.categoriaService.eliminarCategoria(id).subscribe(
    res => {
      this.listarCategoria();
    },
    err => console.log(err)
  )
}
  */
}

}
