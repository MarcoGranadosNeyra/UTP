import { Component, OnInit , ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/tools/dialog/dialog.component';
import {FormBuilder,} from "@angular/forms";
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { DataService } from 'src/app/service/data/data.service';
import { CategoriaService } from 'src/app/service/categoria/categoria.service';
import { Categoria } from 'src/app/modelo/Categoria';

@Component({
  selector: 'app-formapagolist',
  templateUrl: './formapagolist.component.html',
  styleUrls: ['./formapagolist.component.css']
})
export class FormapagolistComponent implements OnInit {


  isPopupOpened = true;

  persona:any=[];
  usuario:any=[];

  displayedColumns: string[] = ['ID','CATEGORIA','IMAGEN','ACCIONES'];
 
  public dataSource: MatTableDataSource<Categoria>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private dataArray: any;


  constructor(
              private dialog :MatDialog,
              private snackBar: MatSnackBar,
              public dataService:DataService,
              private formBuilder:FormBuilder,
              private categoriaService:CategoriaService,
              private activateRoute:ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    this.listarCategoria()
  }

  listarCategoria() {
      this.categoriaService.listarCategoria()
      .subscribe(res => {
        this.dataArray = res;
        this.dataSource = new MatTableDataSource<Categoria>(this.dataArray);
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
  this.categoriaService.buscarCategoria(id).subscribe(
    res => {
      console.log(res)
      this.isPopupOpened = true;
      const dialogRef = this.dialog.open(EditcategoriaComponent, {
        width: '450px',
        data: res
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
            this.listarCategoria();
        }
      });
    },
    err => console.log(err)
  )
  */
}

categoria: string;
imagen: string;

add(){
  /*
  const dialogRef = this.dialog.open(AddcategoriaComponent, {
    width: '450px',
    data: {categoria: this.categoria,imagen:this.imagen}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      this.listarCategoria();
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
      this.eliminarCategoria(id);
      this.openSnackBar('Mensaje ','Registro Desactivado!')  
    }
  });
}

eliminarCategoria(id:number){
  
  this.categoriaService.eliminarCategoria(id).subscribe(
    res => {
      this.listarCategoria();
    },
    err => console.log(err)
  )
}
  
}


