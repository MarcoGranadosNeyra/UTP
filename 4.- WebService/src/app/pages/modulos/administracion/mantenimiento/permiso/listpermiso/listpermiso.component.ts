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
import { PermisoService } from 'src/app/service/permiso/permiso.service';
import { Permiso } from 'src/app/modelo/Permiso';
import { AddpermisoComponent } from '../dialog/addpermiso/addpermiso.component';
import { AditpermisoComponent } from '../dialog/aditpermiso/aditpermiso.component';


@Component({
  selector: 'app-listpermiso',
  templateUrl: './listpermiso.component.html',
  styleUrls: ['./listpermiso.component.css']
})
export class ListpermisoComponent implements OnInit {


  isPopupOpened = true;


  displayedColumns: string[] = ['ID','GRUPO','ROL','MODULO','ORDEN','ESTADO','ACCIONES'];
 
  public dataSource: MatTableDataSource<Permiso>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private dataArray: any;

  constructor(
              private dialog :MatDialog,
              private snackBar: MatSnackBar,
              public dataService:DataService,
              private formBuilder:FormBuilder,
              private permisoService:PermisoService,
              private activateRoute:ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    this.listarPermiso()
  }

  listarPermiso() {
      this.permisoService.listarPermiso()
      .subscribe(res => {
        
        this.dataArray = res;
        this.dataSource = new MatTableDataSource<Permiso>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  

edit(id: number) {
  
  this.permisoService.buscarPermiso(id).subscribe(
    res => {
      console.log(res)
      this.isPopupOpened = true;
      const dialogRef = this.dialog.open(AditpermisoComponent, {
        width: '450px',
        data: res
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
            this.listarPermiso();
        }
      });
    },
    err => console.log(err)
  )
  
}

id_grupo: number;
id_rol: number;
id_modulo: number;
orden: number;
add(){
  
  const dialogRef = this.dialog.open(AddpermisoComponent, {
    width: '450px',
    data: {id_grupo: this.id_grupo,id_rol:this.id_rol,id_modulo:this.id_modulo,orden:this.orden}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      this.listarPermiso();
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
      this.eliminarPermiso(id);
      this.openSnackBar('Mensaje ','Registro Desactivado!')  
    }
  });
}

eliminarPermiso(id:number){
  
  this.permisoService.eliminarPermiso(id).subscribe(
    res => {
      this.listarPermiso();
    },
    err => console.log(err)
  )
}
  
}


