import { Component, OnInit , ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/tools/dialog/dialog.component';
import {FormBuilder, FormGroup,FormControl, Validators} from "@angular/forms";
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { DataService } from 'src/app/service/data/data.service';
import { Usuario } from 'src/app/modelo/Usuario';


@Component({
  selector: 'app-cliente-select',
  templateUrl: './cliente-select.component.html',
  styleUrls: ['./cliente-select.component.css']
})
export class ClienteSelectComponent implements OnInit {


  isPopupOpened = true;

  persona:any=[];
  //usuario:any=[];

  displayedColumns: string[] = ['ID','DOCUMENTO','NRO DOCUMENTO','NOMBRE','ROL','USUARIO','ACTIVO','ACCIONES'];
 
  public dataSource: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private dataArray: any;


  constructor(
              private dialog :MatDialog,
              private snackBar: MatSnackBar,
              public dataService:DataService,
              private formBuilder:FormBuilder,
              private usuarioService:UsuarioService,
              private activateRoute:ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    this.listarUsuario()
  }

  listarUsuario() {
      this.usuarioService.listarUsuario()
      .subscribe(res => {
        this.dataArray = res;
        this.dataSource = new MatTableDataSource<Usuario>(this.dataArray);
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
  this.usuarioService.buscarUsuario(id).subscribe(
    res => {
      console.log(res)
      this.isPopupOpened = true;
      const dialogRef = this.dialog.open(EditusuarioComponent, {
        width: '450px',
        data: res
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
            this.listarUsuario();
        }
      });
    },
    err => console.log(err)
  )
*/
}

id_persona      : number;
id_rol          : number;
usuario         : string;
password        : string;
estado          : boolean;
add(){
  /*
  
  const dialogRef = this.dialog.open(AddusuarioComponent, {
    width: '450px',
    data: {id_persona: this.id_persona,id_rol:this.id_rol,usuario:this.usuario,password:this.password,estado:this.estado}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      this.listarUsuario();
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
      this.eliminarUsuario(id);
      this.openSnackBar('Mensaje ','Registro Desactivado!')  
    }
  });
}

eliminarUsuario(id:number){
  
  this.usuarioService.eliminarUsuario(id).subscribe(
    res => {
      this.listarUsuario();
    },
    err => console.log(err)
  )
}
  
}


