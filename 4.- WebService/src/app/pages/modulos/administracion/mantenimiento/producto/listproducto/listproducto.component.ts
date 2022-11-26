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
import { EditproductoComponent } from '../dialog/editproducto/editproducto.component';
import { AddproductoComponent } from '../dialog/addproducto/addproducto.component';
import { CategoriaService } from 'src/app/service/categoria/categoria.service';
import { ProductoService } from 'src/app/service/producto/producto.service';
import { Producto } from 'src/app/modelo/Producto';

@Component({
  selector: 'app-listproducto',
  templateUrl: './listproducto.component.html',
  styleUrls: ['./listproducto.component.css']
})
export class ListproductoComponent implements OnInit {

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
    this.listarProducto()
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

  async listarProducto() {
      this.productoService.listarProducto()
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
      //console.log(res)
      this.isPopupOpened = true;
      const dialogRef = this.dialog.open(EditproductoComponent, {
        width: '450px',
        data: res
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
            this.listarProducto();
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
  
  const dialogRef = this.dialog.open(AddproductoComponent, {
    width: '450px',
    data: {id_categoria: this.id_categoria, producto: this.producto,precio:this.precio,cantidad:this.cantidad}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      this.listarProducto();
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
  
  this.productoService.eliminarProducto(id).subscribe(
    res => {
      this.listarProducto();
    },
    err => console.log(err)
  )
}
  
}

