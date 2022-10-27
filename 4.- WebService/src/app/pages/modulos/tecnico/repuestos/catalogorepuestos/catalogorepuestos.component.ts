import {Component, OnInit} from '@angular/core';
import { ProductoService } from 'src/app/service/producto/producto.service';
import { DataService } from 'src/app/service/data/data.service';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/service/carrito/carrito.service';

@Component({
  selector: 'app-catalogorepuestos',
  templateUrl: './catalogorepuestos.component.html',
  styleUrls: ['./catalogorepuestos.component.css']
})
export class CatalogorepuestosComponent implements OnInit {


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
    this.listarRepuestosyServicios();
  }

  listarRepuestosyServicios() {
      this.productoService.listarRepuestosyServicios()
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
        this.carritoService.agregarProductoCarrito(this.estefano)
        
      },
      err => console.log(err)
    )
  }






}
