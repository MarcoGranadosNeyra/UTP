import { Component, OnInit , ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/tools/dialog/dialog.component';
import {FormBuilder, FormGroup,FormControl, Validators} from "@angular/forms";
import { Subject } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { DataService } from 'src/app/service/data/data.service';
import { CategoriaService } from 'src/app/service/categoria/categoria.service';
import { ProductoService } from 'src/app/service/producto/producto.service';
import { Producto } from 'src/app/modelo/Producto';
import { EditservicioComponent } from '../dialog/editservicio/editservicio.component';
import { AddservicioComponent } from '../dialog/addservicio/addservicio.component';

@Component({
  selector: 'app-listservicio',
  templateUrl: './listservicio.component.html',
  styleUrls: ['./listservicio.component.css']
})
export class ListservicioComponent implements OnInit {

  isPopupOpened = true;

  persona:any=[];
  usuario:any=[];

  displayedColumns: string[] = ['ID','CATEGORIA','PRODUCTO','PRECIO','ACTIVO','ACCIONES'];
 
  public dataSource: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private dataArray: any;
  formularioFechas: FormGroup;

  constructor(
              private dialog :MatDialog,
              private snackBar: MatSnackBar,
              public dataService:DataService,
              private formBuilder:FormBuilder,
              private usuarioService:UsuarioService,
              private categoriaService:CategoriaService,
              private productoService:ProductoService,
              private activateRoute:ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    this.listarServicio()
  }
/*
  listarPerfil(){
    this.usuarioService.listarPerfil()
    .subscribe(
      res => {
        this.persona=res.persona
        this.usuario=res.usuario
      },
      err => console.log(err)
    )
  }
*/

listarServicio() {
      this.productoService.listarServicio()
      .subscribe(res => {
        this.dataArray = res;
        this.dataSource = new MatTableDataSource<Producto>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
      });
  }


  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  


async edit(id: number) {
  
  this.productoService.buscarServicio(id).subscribe(
    res => {

      this.isPopupOpened = true;
      const dialogRef = this.dialog.open(EditservicioComponent, {
        width: '450px',
        data: res
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
            this.listarServicio();
        }
      });
    },
    err => console.log(err)
  )
  
}


id_categoria: number;
producto: string;
precio: number;
cantidad: number;

add(){
  
  const dialogRef = this.dialog.open(AddservicioComponent, {
    width: '450px',
    data: {id_categoria: this.id_categoria, producto: this.producto,precio:this.precio}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      this.listarServicio();
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
      this.eliminarServicio(id);
      this.openSnackBar('Mensaje ','Registro Desactivado!')  
      
    }

  });
  
}


eliminarServicio(id:number){
  
  this.productoService.eliminarServicio(id).subscribe(
    res => {
      this.listarServicio();
    },
    err => console.log(err)
  )
}
  
}

