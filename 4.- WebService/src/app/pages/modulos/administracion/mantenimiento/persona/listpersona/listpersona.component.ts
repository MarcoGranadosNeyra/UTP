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
import { Persona } from 'src/app/modelo/Persona';
import { PersonaService } from 'src/app/service/persona/persona.service';
import { EdipersonaComponent } from '../dialog/edipersona/edipersona.component';
import { AddpersonaComponent } from '../dialog/addpersona/addpersona.component';

@Component({
  selector: 'app-listpersona',
  templateUrl: './listpersona.component.html',
  styleUrls: ['./listpersona.component.css']
})
export class ListpersonaComponent implements OnInit {


  isPopupOpened = true;

  persona:any=[];
  usuario:any=[];
  objetousuario:any=[];

  displayedColumns: string[] = ['ID','DOCUMENTO','NRO DOCUMENTO','NOMBRE','TELEFONO','CORREO','ACCIONES'];
 
  public dataSource: MatTableDataSource<Persona>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private dataArray: any;
  departamento: any = [];
  provincia: any = [];
  distrito: any = [];
  documento: any = [];

  sexo: any = [];
  formPersona: FormGroup;
  private id_usuario:number;
  constructor(
              private dialog :MatDialog,
              private snackBar: MatSnackBar,
              public dataService:DataService,
              private formBuilder:FormBuilder,
              private personaService:PersonaService,
              private activateRoute:ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    this.listarPersona();
  }

  listarPersona() {
      this.personaService.listarPersona()
      .subscribe(res => {
        this.dataArray = res;
        this.dataSource = new MatTableDataSource<Persona>(this.dataArray);
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
  
  this.personaService.listarPersonaById(id).subscribe(
    res => {
      //console.log(res)
      this.isPopupOpened = true;
      const dialogRef = this.dialog.open(EdipersonaComponent, {
        width: '450px',
        data: res
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
            this.listarPersona();
        }
      });
    },
    err => console.log(err)
  )
  
}


id_documento: number;
nro_documento: string;
nombre: string;
apaterno: string;
amaterno: string;
telefono: string;
direccion: string;
correo: string;

add(){
  
  const dialogRef = this.dialog.open(AddpersonaComponent, {
    width: '450px',
    data: {
      id_documento: this.id_documento,
      nro_documento: this.nro_documento,
      nombre: this.nombre,
      apaterno: this.apaterno,
      amaterno: this.amaterno,
      telefono: this.telefono,
      direccion: this.direccion,
      correo: this.correo,
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      this.listarPersona();
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
  this.personaService.eliminarPersona(id).subscribe(
    res => {
      this.listarPersona();
    },
    err => console.log(err)
  )
}
  
}