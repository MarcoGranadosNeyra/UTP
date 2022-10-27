import { Component,HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup,FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';
import { ProductoService } from 'src/app/service/producto/producto.service';
import { DataService } from 'src/app/service/data/data.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { ClienteService } from 'src/app/service/cliente/cliente.service';
import { VentaService } from 'src/app/service/venta/venta.service';
import { PagoService } from 'src/app/service/pago/pago.service';
import { AtencionService } from 'src/app/service/atencion/atencion.service';


@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {


  servicio : any = {};
  persona :any={};
  cliente :any={};
  formularioPago: FormGroup;
  venta :any={};  
  detalle :any={}; 
  pago :any={};  
  atencion :any={};  
  @HostBinding('class') classes ='row';

  constructor(
            private snackBar: MatSnackBar,
            private formBuilder:FormBuilder,
            private productoService:ProductoService,
            private dataService:DataService,
            private usuarioService:UsuarioService,
            private ventaServive:VentaService,
            private pagoService:PagoService,
            private clienteService:ClienteService,
            private atencionService:AtencionService,
            private activateRoute:ActivatedRoute, 
            private router: Router) { }

  ngOnInit() {
    var id: number = Number(localStorage.getItem('id_usuario'));
    this.listarModulosUsuario(id);
    this.miformularioPago();
    this.buscarServicio(this.dataService.id_producto);
    this.completarFormulario();
    
  }

  listarModulosUsuario(id_usuario:number){
    this.usuarioService.listarModulosUsuario(id_usuario).subscribe(
      res => {

        //this.modulos=res.modulos
        this.persona=res.persona
        //console.log(res.persona)
        //this.rol=res.rol
        this.buscarClientePorIdPersona(this.persona.id);
      },
        err=>console.error(err)
    );
  }

  buscarClientePorIdPersona(id_persona:number){
    this.clienteService.buscarClientePorIdPersona(id_persona).subscribe(
      res => {
        this.cliente=res;
        //console.log(this.cliente)
        this.formularioPago.get("id_cliente").setValue(this.cliente.id);
      },
        err=>console.error(err)
    );
  }

  completarFormulario(){
    var id_usuario: number = Number(localStorage.getItem('id_usuario'));
    this.formularioPago.get("id_usuario").setValue(id_usuario);
    this.formularioPago.get("id_cliente").setValue(this.cliente.id);
    this.formularioPago.get("id_producto").setValue(this.dataService.id_producto);
    this.formularioPago.get("precio").setValue(this.dataService.precio);
  }

  miformularioPago(){
    this.formularioPago = this.formBuilder.group({
      id_usuario        :  [null, Validators.required],
      id_cliente        :  [null, Validators.required],
      id_producto       :  [null, Validators.required],
      precio            :  [null, Validators.required],
    });
  }

  buscarServicio(id:number){
    this.productoService.buscarProducto(id).subscribe(
      res => {
        //console.log(res)
          this.servicio=res;
      },
      err => console.log(err)
    )
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition:'right',
    });
  }

  agregarVenta() {
    
    if(this.formularioPago.valid){
      
      const id_usuario=2;// le mandamos un id usuario en duro que es ventasWeb
      const id_cliente=this.formularioPago.get('id_cliente').value;
      this.venta.id_usuario=id_usuario;
      this.venta.id_cliente=id_cliente;
      this.ventaServive.agregarVenta(this.venta)
      .subscribe( res => {

        const id_producto=this.formularioPago.get('id_producto').value;
        const precio=this.formularioPago.get('precio').value;

          if (res.result==1) {
            const id_venta=res.id_venta;
            this.agregarDetalle(id_venta,id_producto,precio);

            this.pago.id_venta=id_venta;
            this.pago.id_forma_pago=2;
            this.pago.monto=precio;
            this.agregarPago(this.pago);

            this.atencion.id_venta=id_venta;
            this.atencion.id_calendario=this.dataService.id_calendario;
            this.atencion.fecha=this.dataService.fecha;
            this.atencion.hora=this.dataService.hora;

            this.agregarAtencion(this.atencion)
            this.openSnackBar('Mensaje ',res.mensaje);
            //this.router.navigate(['main/vendedor/carrito/imprimirventa']);
            this.router.navigate(['main/cliente/soporte/imprimirservicio']);
            this.dataService.id_venta=res.id_venta;
          }else{
            this.openSnackBar('Mensaje ',res.mensaje);
        }
      });
    }
    
  }

  agregarPago(pago) {
    this.pagoService.agregarPago(pago)
    .subscribe( res => {
      console.log(res)
    });
  }

  agregarDetalle(id_venta:number,id_producto:number,precio:number) {

          this.detalle.id_venta=id_venta;
          this.detalle.id_producto=id_producto;
          this.detalle.cantidad=1;
          this.detalle.precio=precio;

          this.ventaServive.agregarVentaDetalle(this.detalle)
          .subscribe( res => {
            console.log(res)
          });
  }

  agregarAtencion(atencion) {
    this.atencionService.agregarAtencion(atencion)
    .subscribe( res => {
      console.log(res)

      if (res.result==1) {
        this.dataService.id_atencion=res.id_atencion;
        //this.router.navigate(['cliente/soporte/imprimirservicio']);
      }
    });
    
  }

  get number_card() {
    return this.formularioPago.get('number_card');
  }

  get expire_card() {
    return this.formularioPago.get('expire_card');
  }

  get ccv_card() {
    return this.formularioPago.get('ccv_card');
  }


  cancelarPago(){
    this.router.navigate(['cita']);
    /*
    this.service.cancelarPago(idCita).subscribe(
      res => {
         this.router.navigate(['cita']);
      },
      err => console.log(err)
    )
      */
  }






}
