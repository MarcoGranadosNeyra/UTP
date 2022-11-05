import { Component, OnInit , ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/tools/dialog/dialog.component';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { DataService } from 'src/app/service/data/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CotizacionService } from 'src/app/service/cotizacion/cotizacion.service';
import { Cotizacion } from 'src/app/modelo/Cotizacion';
import { VentaService } from 'src/app/service/venta/venta.service';
import { PagoService } from 'src/app/service/pago/pago.service';

@Component({
  selector: 'app-cotizacionesfinalizadas',
  templateUrl: './cotizacionesfinalizadas.component.html',
  styleUrls: ['./cotizacionesfinalizadas.component.css']
})
export class CotizacionesfinalizadasComponent implements OnInit {

  private apiURL = environment.apiUrl;

  isPopupOpened = true;
  detalleCotizacion:any=[];
  detalle :any={};
  
  public formVenta: FormGroup;

  displayedColumns: string[] = ['ID','TECNICO','CLIENTE','FECHA','HORA','ESTADO','ACCIONES'];
 
  public dataSource: MatTableDataSource<Cotizacion>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private dataArray: any;


  constructor(
              private httpClient: HttpClient, 
              private dialog :MatDialog,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              public dataService:DataService,
              private cotizacionService:CotizacionService,
              private ventaService:VentaService,
              private pagoService:PagoService,
              private activateRoute:ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    this.formularioVenta();
    this.listarCotizacionesFinalizadas();
    
  }

  listarCotizacionesFinalizadas() {
    this.cotizacionService.listarCotizacionesFinalizadas()
    .subscribe(res => {     
      this.dataArray = res;
      this.dataSource = new MatTableDataSource<Cotizacion>(this.dataArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
}

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  

edit(id: number) {
  /*
  this.atencionService.buscarCategoria(id).subscribe(
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
        data:'¿confirma generar la venta para esta cotizacion?'
  });

  dialogRef.afterClosed().subscribe(res=>{

    if (res) {
      this.generarVenta(id);
      this.listarCotizacionDetalle(id);
      //this.openSnackBar('Mensaje ','Registro actualizado!')  
    }
  });
  
}

formularioVenta(){
  this.formVenta = this.formBuilder.group({
    id_usuario        :  [null, Validators.required],
    id_cliente        :  [null, Validators.required],
  });
}


generarVenta(id:number){
  
  this.cotizacionService.buscarCotizacion(id).subscribe(
    res => {

      this.formVenta.get('id_usuario').setValue(res.id_usuario);
      this.formVenta.get('id_cliente').setValue(res.id_cliente);
      const id_cotizacion=res.id;
      this.listarCotizacionDetalle(id_cotizacion);
      this.agregarVenta()
    },
    err => console.log(err)
  )
}

agregarVenta() {
  if(this.formVenta.valid){
    /*
    this.dataService.formaPago
    this.router.navigate(['main/vendedor/carrito/formapago']);
    */
    
    this.ventaService.agregarVenta(this.formVenta.value)
    .subscribe( res => {
      console.log(res)
      if (res.result==1) {

        this.agregarDetalle(res.id_venta);
        this.openSnackBar('Mensaje ',res.mensaje);
        //this.router.navigate(['main/vendedor/carrito/imprimirventa']);
        this.dataService.id_venta=res.id_venta;
      }else{
        this.openSnackBar('Mensaje ',res.mensaje);
      }
    });
  }
}

agregarDetalle(id_venta:number) {
  
  var array=this.detalleCotizacion;

      for (var i = 0; i < array.length; i++) {
      this.detalle.id_venta=id_venta;
      this.detalle.id_producto=array[i].id_producto;
      this.detalle.cantidad=array[i].cantidad;
      this.detalle.precio=array[i].precio;

        this.ventaService.agregarVentaDetalle(this.detalle)        
        .subscribe( res => {
          console.log(res)
        });
    }
    //como se limpia un array
}

listarCotizacionDetalle(id:number) {
  this.cotizacionService.listarCotizacionDetalle(id)
  .subscribe(res => {
    this.detalleCotizacion=res;
  });
}

abrirDocumento(id:number) {
  
  window.open(`${this.apiURL}/cotizacion/imprimirCotizacion/${id}`+ '#page=' + 1, '_blank', '');
  
}
  
}


