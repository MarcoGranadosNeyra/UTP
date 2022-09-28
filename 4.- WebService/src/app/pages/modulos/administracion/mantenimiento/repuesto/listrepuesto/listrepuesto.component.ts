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
import { CategoriaService } from 'src/app/service/categoria/categoria.service';
import { ProductoService } from 'src/app/service/producto/producto.service';
import { Producto } from 'src/app/modelo/Producto';
import { EditrepuestoComponent } from '../dialog/editrepuesto/editrepuesto.component';
import { AddrepuestoComponent } from '../dialog/addrepuesto/addrepuesto.component';

@Component({
  selector: 'app-listrepuesto',
  templateUrl: './listrepuesto.component.html',
  styleUrls: ['./listrepuesto.component.css']
})
export class ListrepuestoComponent implements OnInit {


  isPopupOpened = true;

  persona:any=[];
  usuario:any=[];

  displayedColumns: string[] = ['ID','CATEGORIA','PRODUCTO','PRECIO','CANTIDAD','ACTIVO','ACCIONES'];
 
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
    this.listarRepuesto()
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

listarRepuesto() {
      this.productoService.listarRepuesto()
      .subscribe(res => {
        this.dataArray = res;
        this.dataSource = new MatTableDataSource<Producto>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res)
      });
  }


  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  


async edit(id: number) {
  
  this.productoService.buscarProducto(id).subscribe(
    res => {
      console.log(res)
      this.isPopupOpened = true;
      const dialogRef = this.dialog.open(EditrepuestoComponent, {
        width: '450px',
        data: res
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
            this.listarRepuesto();
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
  
  const dialogRef = this.dialog.open(AddrepuestoComponent, {
    width: '450px',
    data: {id_categoria: this.id_categoria, producto: this.producto,precio:this.precio,cantidad:this.cantidad}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      this.listarRepuesto();
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
      this.eliminarRepuesto(id);
      this.openSnackBar('Mensaje ','Registro Desactivado!')  
      
    }

  });
  
}


eliminarRepuesto(id:number){
  
  this.productoService.eliminarRepuesto(id).subscribe(
    res => {
      this.listarRepuesto();
    },
    err => console.log(err)
  )
}
  
}

