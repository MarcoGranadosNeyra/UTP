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
import { EdittecnicoComponent } from '../dialog/edittecnico/edittecnico/edittecnico.component';
import { AddtecnicoComponent } from '../dialog/addtecnico/addtecnico/addtecnico.component';



@Component({
  selector: 'app-listtecnico',
  templateUrl: './listtecnico.component.html',
  styleUrls: ['./listtecnico.component.css']
})
export class ListtecnicoComponent implements OnInit {


  isPopupOpened = true;

  persona:any=[];
  usuario:any=[];
  objetousuario:any=[];

  displayedColumns: string[] = ['ID','DOCUMENTO','NRO DOCUMENTO','NOMBRE','EXPERIENCIA','ACTIVO','ACCIONES'];
 
  public dataSource: MatTableDataSource<Tecnico>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private dataArray: any;
  formUsuario: FormGroup;
  private id_usuario:number;
  constructor(
              private dialog :MatDialog,
              private snackBar: MatSnackBar,
              public dataService:DataService,
              private formBuilder:FormBuilder,
              private usuarioService:UsuarioService,
              private tecnicoService:TecnicoService,
              private productoalmacenService:ProductoalmacenService,
              private activateRoute:ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    this.formularioUsuario();
    this.listarTecnico();
  }

  formularioUsuario(){
    this.formUsuario = this.formBuilder.group({
      id            :  [null, Validators.required],
      id_persona    :  [null, Validators.required],
      id_rol        :  [null, Validators.required],
      id_tipo_usuario  :  [null, Validators.required],
      usuario       :  [null, Validators.required],
      password      :  [null, Validators.required],
      estado        :  [null, Validators.required],
    });
  }

  listarTecnico() {
      this.tecnicoService.listarTecnico()
      .subscribe(res => {
        this.dataArray = res;
        this.dataSource = new MatTableDataSource<Tecnico>(this.dataArray);
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
  
  this.tecnicoService.buscarTecnico(id).subscribe(
    res => {
      console.log(res)
      this.isPopupOpened = true;
      const dialogRef = this.dialog.open(EdittecnicoComponent, {
        width: '450px',
        data: res
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
            this.listarTecnico();
        }
      });
    },
    err => console.log(err)
  )
}

id_especialidad: number;
id_persona: number;
especialidad: string;

add(){
  
  const dialogRef = this.dialog.open(AddtecnicoComponent, {
    width: '450px',
    data: {id_especialidad: this.id_especialidad, id_persona: this.id_persona,especialidad:this.especialidad}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      this.listarTecnico();
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
      this.eliminarTecnico(id);
      this.openSnackBar('Mensaje ','Registro Desactivado!')  
      
    }

  });
  
}


eliminarTecnico(id:number){
  this.tecnicoService.eliminarTecnico(id).subscribe(
    res => {
      this.listarTecnico();
    },
    err => console.log(err)
  )
}
  
}