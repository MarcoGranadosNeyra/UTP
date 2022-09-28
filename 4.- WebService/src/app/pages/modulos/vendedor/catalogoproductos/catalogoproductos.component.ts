import {Component, OnInit} from '@angular/core';
import { ProductoService } from 'src/app/service/producto/producto.service';
import { DataService } from 'src/app/service/data/data.service';
import { Producto } from 'src/app/modelo/Producto';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/service/carrito/carrito.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-catalogoproductos',
  templateUrl: './catalogoproductos.component.html',
  styleUrls: ['./catalogoproductos.component.css']
})
export class CatalogoproductosComponent implements OnInit {

  filtroProductos="";
  productos: any = [];
  estefano: any = {};
  contador:number=0;
  constructor(
              private productoService:ProductoService,
              private dataService:DataService,
              private router : Router,
              private carritoService:CarritoService,
              ) {}

  async ngOnInit() {
    this.listarProducto();
  }

  listarProducto() {
      this.productoService.listarProducto()
      .subscribe(res => {
        this.productos=res;
      });
  }

  buscarProducto(id:number){
    this.productoService.buscarProducto(id).subscribe(
      res => {
        
        this.dataService.cantidad++
        this.contador++
        this.dataService.productos.push(res);
        this.estefano=res
        //console.log(this.estefano.precio)
        this.carritoService.agregarProductoCarrito(this.estefano)
        
      },
      err => console.log(err)
    )
  }






}
