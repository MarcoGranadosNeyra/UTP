import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/tools/dialog/dialog.component';
import { DataService } from 'src/app/service/data/data.service';
import { CarritoService } from 'src/app/service/carrito/carrito.service';
import {FormBuilder, FormGroup,FormControl, Validators} from "@angular/forms";
import { PersonaService } from 'src/app/service/persona/persona.service';
import { VentaService } from 'src/app/service/venta/venta.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from 'src/app/service/cliente/cliente.service';
import { CotizacionService } from 'src/app/service/cotizacion/cotizacion.service';
declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-carritorepuestos',
  templateUrl: './carritorepuestos.component.html',
  styleUrls: ['./carritorepuestos.component.css']
})
export class CarritorepuestosComponent implements OnInit {


  documento:any[];
  productos:any[];
  pagos:any[];
  persona :any={};
  id_usuario :any={};
  detalle :any={};

  formCotizacion: FormGroup;
  constructor(
            private dataService:DataService,
            private snackBar: MatSnackBar,
            private dialog :MatDialog,
            private carritoService:CarritoService,
            private personaService:PersonaService,
            private clienteService:ClienteService,
            private cotizacionService:CotizacionService,
            private formBuilder:FormBuilder,
            private router: Router,
            private http:HttpClient,
            ) { }

  ngOnInit(): void {
    //this.formCotizacion.get('id_usuario').setValue(this.dataService.id_usuario);
    //this.formCotizacion.get('id_cliente').setValue(this.dataService.id_cliente);
    //console.log(this.dataService.id_usuario)
    //console.log(this.dataService.id_cliente)

    this.formularioCotizacion();
    this.listarCarrito();
    this.subtotal();
  }

  formularioCotizacion(){
    this.formCotizacion = this.formBuilder.group({
      id_usuario        :  [null, Validators.required],
      id_cliente        :  [null, Validators.required],
    })
  }

  public listarCarrito(){
    this.productos=this.carritoService.productosCarrito;
    this.formCotizacion.get('id_usuario').setValue(this.dataService.id_usuario);
    this.formCotizacion.get('id_cliente').setValue(this.dataService.id_cliente);
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
          data:'¿Esta seguro de eliminar este producto del carrito?'
    });
  
    dialogRef.afterClosed().subscribe(res=>{
      if (res) {
        this.eliminarCarrito(id);
        this.openSnackBar('Mensaje ','Carrito Actualizado!')  
      }
    });
    
  }

  confirmarDialogoEliminar(producto:any):void{
  
    const dialogRef=this.dialog.open(DialogComponent,{
          width:'450px',
          data:'¿Esta seguro de eliminar este producto del carrito?'
    });
  
    dialogRef.afterClosed().subscribe(res=>{
  
      if (res) {
        this.eliminarProductoCarrito(producto);
        this.openSnackBar('Mensaje ','Carrito Actualizado!')  ;
        this.listarCarrito();
      }
  
    });
    
  }

  public eliminarCarrito(id:number){
    let busqueda = id;
    let indice = this.dataService.productos.findIndex(idendificador => idendificador.id === busqueda);
    this.dataService.productos.splice(indice, 1);
    this.subtotal();
  }

  public eliminarProductoCarrito(producto){
    this.carritoService.eliminarProductoCarrito(producto);
    this.subtotal();
  }

  monto: number;

  public subtotal(){
    var array=this.carritoService.productosCarrito;
    var subtotal=0;
        for (var i = 0; i < array.length; i++) {
          subtotal=subtotal+array[i].producto.precio*array[i].quantity
      }
      this.monto=subtotal;
  }

  agregarCotizacion() {
    if(this.formCotizacion.valid){
      //this.dataService.formaPago
      //this.router.navigate(['main/vendedor/carrito/formapago']);
      
      this.cotizacionService.agregarCotizacion(this.formCotizacion.value)
      .subscribe( res => {
       console.log(res)
        if (res.result==1) {
          const id_cotizacion=res.id_cotizacion;
          this.agregarDetalle(res.id_cotizacion);
          this.openSnackBar('Mensaje ',res.mensaje);
          this.router.navigate(['main/tecnico/cotizacion/imprimircotizacion']);
          this.dataService.id_cotizacion=res.id_cotizacion;
        }else{
          this.openSnackBar('Mensaje ',res.mensaje);
        }
      });
      
    }
    
  }

  agregarDetalle(id_cotizacion:number) {
    var array=this.carritoService.productosCarrito;

        for (var i = 0; i < array.length; i++) {
          this.detalle.id_cotizacion=id_cotizacion;
          this.detalle.id_producto=array[i].producto.id;
          this.detalle.cantidad=array[i].quantity;
          this.detalle.precio=array[i].producto.precio;
          this.cotizacionService.agregarCotizacionDetalle(this.detalle)
          .subscribe( res => {
            console.log(res)
          });     
      }
      this.carritoService.limpiarCarrito();
  }

  cancelar() {
    this.router.navigate(['main/tecnico/recepcion/catalogorepuestos']);
    this.carritoService.limpiarCarrito();
  }

  public eliminarPago(id:number){
    let busqueda = id;
    let indice = this.dataService.productos.findIndex(idendificador => idendificador.id === busqueda);
    this.dataService.productos.splice(indice, 1);
    this.subtotal();
  }

}
