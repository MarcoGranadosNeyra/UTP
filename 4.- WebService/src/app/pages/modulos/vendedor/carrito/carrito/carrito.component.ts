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
declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  documento:any[];
  productos:any[];
  persona :any={};
  id_usuario :any={};
  detalle :any={};
  formCliente: FormGroup;
  formVenta: FormGroup;
  constructor(
            private dataService:DataService,
            private snackBar: MatSnackBar,
            private dialog :MatDialog,
            private carritoService:CarritoService,
            private personaService:PersonaService,
            private ventaServive:VentaService,
            private formBuilder:FormBuilder,
            private router: Router,
            private http:HttpClient,
            ) { }

  ngOnInit(): void {

    this.listarCarrito();
    this.formularioCliente();
    this.formularioVenta();
    this.subtotal();
    this.listarDocumento();
  }

  formularioVenta(){
    this.formVenta = this.formBuilder.group({
      id_usuario        :  [null, Validators.required],
      id_cliente        :  [null, Validators.required],
    })
  }

  public listarCarrito(){
    this.productos=this.carritoService.productosCarrito;
 

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

  formularioCliente(){
    this.formCliente = this.formBuilder.group({
      id_documento      :   [null, Validators.required],
      nro_documento     :   [null, Validators.required]
    });
  }

  validarCliente() {
    if(this.formCliente.valid){
      
      this.personaService.listarPersonaByDNI(this.formCliente.value)
      .subscribe( res => {
        
        this.persona=res.persona;
        this.formVenta.get('id_cliente').setValue(this.persona.id)

      var id: number = Number(localStorage.getItem('id_usuario'));
      this.id_usuario=id;
      console.log(this.id_usuario);
      this.formVenta.get('id_usuario').setValue(id)
      });
    }
  }

listarDocumento(){
  this.personaService.listarDocumento()
  .subscribe(
    res=> {this.documento=res;
    },
    err=> console.error(err)
  )
}

  agregarVenta() {
    if(this.formVenta.valid){
      
      this.ventaServive.agregarVenta(this.formVenta.value)
      .subscribe( res => {
       
        if (res.result==1) {
          const id_venta=res.id_venta;
          this.agregarDetalle(res.id_venta);
          this.openSnackBar('Mensaje ',res.mensaje);
          this.router.navigate(['main/vendedor/carrito/imprimirventa']);
          this.dataService.id_venta=res.id_venta;
        }else{
          this.openSnackBar('Mensaje ',res.mensaje);
          /*
          if(res.error.constraint=="uq_id_persona_medico"){
            this.openSnackBar('Error : El Medico ya esta registrado','');
          }
            */
        }
      });
    }
  }

  agregarDetalle(id_venta:number) {
    var array=this.carritoService.productosCarrito;

        for (var i = 0; i < array.length; i++) {
          this.detalle.id_venta=id_venta;
          this.detalle.id_producto=array[i].producto.id;
          this.detalle.cantidad=array[i].quantity;
          this.detalle.precio=array[i].producto.precio;
          this.ventaServive.agregarVentaDetalle(this.detalle)
          .subscribe( res => {
            console.log(res)
          });     
      }
      this.carritoService.limpiarCarrito();
  }

  cancelar() {
    this.router.navigate(['main/vendedor/catalogoproductos']);
    this.carritoService.limpiarCarrito();
  }

}
